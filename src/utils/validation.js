import * as z from "zod";
import {
  CHALLENGE_CATEGORIES,
  DIFFICULTIES,
  KIT_PIECES,
  TIME_SIGNATURES,
} from "../data/constants.js";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address.")),
  password: z.string().min(6, "Use at least 6 characters for the password."),
});

export const challengeSchema = z.object({
  title: z.string().trim().min(3, "Use at least 3 characters for the title.").max(70, "Keep the title to 70 characters or fewer."),
  description: z.string().trim().min(20, "Describe the challenge in at least 20 characters.").max(600, "Keep the description to 600 characters or fewer."),
  category: z.enum(CHALLENGE_CATEGORIES, { error: "Choose Fill or Groove." }),
  difficulty: z.enum(DIFFICULTIES, { error: "Choose a difficulty." }),
  kitPieces: z.array(z.enum(KIT_PIECES.map((piece) => piece.id)))
    .min(1, "Choose at least one piece of the kit.")
    .max(KIT_PIECES.length)
    .refine((pieces) => new Set(pieces).size === pieces.length, "Select each kit piece only once."),
  restrictions: z.string().trim().min(10, "Describe at least one restriction (10 characters minimum).").max(300, "Keep the restrictions to 300 characters or fewer."),
  bpm: z.coerce.number().int("Use a whole number for BPM.").min(40, "BPM must be at least 40.").max(240, "BPM must be 240 or less."),
  timeSignature: z.enum(TIME_SIGNATURES, { error: "Choose a time signature." }),
  minutes: z.coerce.number().int("Use a whole number of minutes.").min(5, "Practice time must be at least 5 minutes.").max(45, "Practice time must be 45 minutes or less."),
});

export const storedChallengeSchema = challengeSchema.extend({
  id: z.string().min(1),
  bpm: z.number().int().min(40).max(240),
  minutes: z.number().int().min(5).max(45),
  createdAt: z.iso.datetime(),
  completedAt: z.iso.datetime().nullable(),
  isCustom: z.boolean(),
});

export const storeSchema = z.object({
  version: z.literal(1),
  challenges: z.array(storedChallengeSchema),
  dailyAssignments: z.record(z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.string().min(1)),
}).superRefine((store, context) => {
  const ids = new Set(store.challenges.map((challenge) => challenge.id));
  if (ids.size !== store.challenges.length) {
    context.addIssue({ code: "custom", message: "Challenge IDs must be unique.", path: ["challenges"] });
  }
  for (const [date, id] of Object.entries(store.dailyAssignments)) {
    if (!ids.has(id)) {
      context.addIssue({ code: "custom", message: "A daily challenge is missing from the library.", path: ["dailyAssignments", date] });
    }
  }
});

export function getFieldErrors(error) {
  const errors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] || "form";
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
