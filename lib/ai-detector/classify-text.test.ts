import { describe, it, expect } from "vitest";
import { classifyTextType } from "./classify-text";

describe("classifyTextType", () => {
  it("returns prose for a normal paragraph", () => {
    const text = `
      The quick brown fox jumps over the lazy dog. It was a bright cold day in April,
      and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his
      breast in an effort to escape the vile wind, slipped quickly through the glass
      doors of Victory Mansions. The hallway smelt of boiled cabbage and old rag mats.
    `;
    expect(classifyTextType(text)).toBe("prose");
  });

  it("returns structured for a workout plan", () => {
    const text = `
      Chest Press (Machine) 3 x 8-10
      Incline Dumbbell Press 3 x 10-12
      Cable Flyes 3 x 12-15
      Lat Pulldown 3 x 8-10
      Seated Cable Row 3 x 10-12
      Face Pulls 3 x 15-20
      Lateral Raises 3 x 12-15
      Rear Delt Flyes 3 x 15
    `;
    expect(classifyTextType(text)).toBe("structured");
  });

  it("returns structured for a bullet list", () => {
    const text = `
      - Preheat oven to 180C
      - Mix flour and sugar
      - Add eggs one at a time
      - Fold in butter
      - Pour into tin
      - Bake for 25 minutes
      - Cool on wire rack
    `;
    expect(classifyTextType(text)).toBe("structured");
  });

  it("returns structured for a numbered list", () => {
    const text = `
      1. Install dependencies
      2. Create configuration file
      3. Set environment variables
      4. Run database migrations
      5. Start development server
      6. Open browser to localhost
    `;
    expect(classifyTextType(text)).toBe("structured");
  });

  it("returns structured for key-value pairs", () => {
    const text = `
      Name: John Smith
      Age: 34
      Location: London
      Role: Software Engineer
      Team: Platform
      Start date: 2024-01-15
    `;
    expect(classifyTextType(text)).toBe("structured");
  });

  it("returns mixed for prose with an embedded list", () => {
    const text = `
      Here's what you need to get started with the project. It's not too complicated
      but there are a few steps you shouldn't skip.

      1. Clone the repository
      2. Install dependencies
      3. Set up your environment variables

      After that you should be good to go. The dev server starts on port 3000
      and hot reloads whenever you save a file. Pretty standard stuff.
    `;
    expect(classifyTextType(text)).toBe("mixed");
  });

  it("returns prose for empty string", () => {
    expect(classifyTextType("")).toBe("prose");
  });

  it("returns prose for a single sentence", () => {
    expect(classifyTextType("Just a single sentence.")).toBe("prose");
  });
});
