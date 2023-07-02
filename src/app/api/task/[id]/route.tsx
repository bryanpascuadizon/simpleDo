import Task from "@/model/task";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

interface DBTaskProps {
  params: {
    id: string;
  };
}

export const GET = async (request: Request, { params }: DBTaskProps) => {
  try {
    await connectToDB();
    const getResponse = await Task.find({ user_id: params.id });
    return new NextResponse(JSON.stringify(getResponse), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to get User Tasks.", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: DBTaskProps) => {
  try {
    const req = await request.json();
    await connectToDB();
    const userTask = await Task.findById({ _id: params.id });
    userTask.title = req.title;
    userTask.note = req.note;
    userTask.isCompleted = req.isCompleted;
    userTask.save();
    return new NextResponse(JSON.stringify(userTask), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update User Task.", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    await connectToDB();
    const userTask = await Task.findOneAndDelete(params.id);

    if (!userTask)
      return new NextResponse("User Task not found", { status: 404 });

    return new NextResponse("Successfuly deleted User Task", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete User Task.", { status: 500 });
  }
};
