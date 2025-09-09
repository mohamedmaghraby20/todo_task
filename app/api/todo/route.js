import prisma from "@/lib/prisma"; 
import { NextResponse } from "next/server";
import { validateTodoData } from "@/lib/todo";

/**
 * Handling server api with new nextjs "app route".
 * in the provided github repo it uses "page route" where we need to check for methods in "req"
 * ex: if (req.method === "GET") etc.., and sending response with argument "res".
 * Here we use "NextResponse" to handle server responses
 */

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({status: "success", message: "All Todos fetched successfully ",   data: todos });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const error = validateTodoData(body);
    if (error) return NextResponse.json({ status: "error", error }, { status: 400 });

    const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description || "",
        status: body.status || "not started",
      },
    });

    return NextResponse.json({ status: "success", message: "Todo created successfully", data: newTodo }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", error: "Failed to create todo" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const error = validateTodoData(body);
    if (error) return NextResponse.json({ status: "error", error }, { status: 400 });

    const updatedTodo = await prisma.todo.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description || "",
        status: body.status || "not started",
      },
    });

    return NextResponse.json({status: "success", message: "Todo updated successfully", data: updatedTodo });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    const deletedTodo = await prisma.todo.delete({
      where: { id: body.id },
    });

    return NextResponse.json({ status: "success", message: "Todo deleted successfully", data: deletedTodo });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", error: "Failed to delete todo" }, { status: 500 });
  }
}
