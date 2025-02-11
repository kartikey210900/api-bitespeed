const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const Contact = require("../models/Contact");
router.get("/", (req, res) => {
  res.json({ message: "GET /identify works!" });
});
router.post("/", async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res
        .status(400)
        .json({ error: "Email or phone number is required" });
    }

    // Handle GET /identify

    let existingContacts = await Contact.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNumber }],
      },
      order: [["createdAt", "ASC"]],
    });

    if (existingContacts.length === 0) {
      const newContact = await Contact.create({
        phoneNumber,
        email,
        linkPrecedence: "primary",
      });

      return res.json({
        contact: {
          primaryContactId: newContact.id,
          emails: [newContact.email].filter(Boolean),
          phoneNumbers: [newContact.phoneNumber].filter(Boolean),
          secondaryContactIds: [],
        },
      });
    }

    let primaryContact =
      existingContacts.find((c) => c.linkPrecedence === "primary") ||
      existingContacts[0];

    const isAlreadyPresent = existingContacts.some(
      (c) => c.email === email && c.phoneNumber === phoneNumber
    );

    if (!isAlreadyPresent) {
      const newSecondary = await Contact.create({
        phoneNumber,
        email,
        linkedId: primaryContact.id,
        linkPrecedence: "secondary",
      });

      existingContacts.push(newSecondary);
    }

    const emails = [
      primaryContact.email,
      ...existingContacts
        .filter((c) => c.email && c.email !== primaryContact.email)
        .map((c) => c.email),
    ];
    const phoneNumbers = [
      primaryContact.phoneNumber,
      ...existingContacts
        .filter(
          (c) => c.phoneNumber && c.phoneNumber !== primaryContact.phoneNumber
        )
        .map((c) => c.phoneNumber),
    ];
    const secondaryContactIds = existingContacts
      .filter((c) => c.linkPrecedence === "secondary")
      .map((c) => c.id);

    return res.json({
      contact: {
        primaryContactId: primaryContact.id,
        emails: [...new Set(emails)],
        phoneNumbers: [...new Set(phoneNumbers)],
        secondaryContactIds,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
