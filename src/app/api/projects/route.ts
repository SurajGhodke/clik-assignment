import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/projects.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  try {
    const newProject = await req.json();
    newProject.createdOn = new Date().toISOString().split("T")[0]; // Set createdOn date

    const data = fs.readFileSync(filePath, "utf8");
    const projects = JSON.parse(data);
    projects.push(newProject);

    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));

    return NextResponse.json({
      success: true,
      message: "Project added successfully",
      projects,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding project" },
      { status: 500 }
    );
  }
}
