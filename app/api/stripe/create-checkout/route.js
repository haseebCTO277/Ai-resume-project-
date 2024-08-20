//Users/mohsinal/airesume-5/app/api/stripe/create-checkout/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { createCheckout } from "@/libs/stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import config from "@/config";

export async function POST(req) {
  const body = await req.json();

  if (!body.priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  } else if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json(
      { error: "Success and cancel URLs are required" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    await connectMongo();

    const user = await User.findById(session?.user?.id);

    const { priceId, successUrl, cancelUrl } = body;

    // Find the plan in the config that matches the priceId
    const selectedPlan = config.stripe.plans.find(plan => plan.priceId === priceId);

    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid priceId' }, { status: 400 });
    }

    // Determine mode based on the plan in the config
    const mode = selectedPlan.isSubscription ? "subscription" : "payment";

    const stripeSessionURL = await createCheckout({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      clientReferenceId: user?._id?.toString(),
      user,
      // If you send coupons from the frontend, you can pass it here
      // couponId: body.couponId,
    });

    return NextResponse.json({ url: stripeSessionURL });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}