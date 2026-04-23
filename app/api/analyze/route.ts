import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: NextRequest) {
  try {
    const { review } = await req.json();

    if (!review || typeof review !== "string" || review.trim() === "") {
      return NextResponse.json(
        { error: "Review text is required." },
        { status: 400 }
      );
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured." },
        { status: 500 }
      );
    }

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const output = await client.textClassification({
      model: "cardiffnlp/twitter-roberta-base-sentiment-latest",
      inputs: review,
      provider: "hf-inference",
    });

    console.log("HF output:", output);

    // Cardiff returns [{label: "positive", score}, {label: "negative", score}, {label: "neutral", score}]
    const top = output.reduce((a, b) => (a.score > b.score ? a : b));

    const labelMap: Record<string, string> = {
      positive: "Positive",
      negative: "Negative",
      neutral: "Neutral",
    };

    const sentiment = labelMap[top.label.toLowerCase()] ?? top.label;
    const confidence = (top.score * 100).toFixed(1) + "%";

    return NextResponse.json({ sentiment, confidence });
  } catch (error) {
    console.error("Analyze route error:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}