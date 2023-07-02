import Task from "@/model/task";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const req = await request.json();

  const { userId, title, note, isCompleted } = req;

  try {
    await connectToDB();
    const postRequest = new Task({
      user_id: userId,
      title,
      note,
      isCompleted,
    });
    await postRequest.save();
    return new NextResponse(JSON.stringify(postRequest), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to post Task.", { status: 500 });
  }
};
