"use server";

import { db } from "../db";

export default async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
  } catch (err) {
    console.log("error deleting account:", err);
  }
}
