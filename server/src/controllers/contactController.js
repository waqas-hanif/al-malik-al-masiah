import Contact from "../models/Contact.js";

// Create contact enquiry
export const createContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      language,
      source,
    } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
      language,
      source,
    });

    res.status(201).json({
      success: true,
      message:
        "Your enquiry has been submitted successfully.",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Get all enquiries
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Get single enquiry
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Update enquiry status
export const updateContactStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "read",
      "replied",
      "closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully.",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Delete enquiry
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact enquiry deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};