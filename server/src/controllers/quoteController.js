import Quote from "../models/Quote.js";

// Create quote request
export const createQuote = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      projectLocation,
      budget,
      expectedStartDate,
      description,
      language,
      source,
    } = req.body;

    const quote = await Quote.create({
      name,
      email,
      phone,
      company,
      projectType,
      projectLocation,
      budget,
      expectedStartDate,
      description,
      language,
      source,
    });

    res.status(201).json({
      success: true,
      message:
        "Your quotation request has been submitted successfully.",
      data: quote,
    });
  } catch (error) {
    next(error);
  }
};

// Get all quotes
export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    next(error);
  }
};

// Get single quote
export const getQuoteById = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote request not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    next(error);
  }
};

// Update quote status
export const updateQuoteStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "reviewing",
      "quoted",
      "approved",
      "rejected",
      "closed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quote status.",
      });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote request not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote status updated successfully.",
      data: quote,
    });
  } catch (error) {
    next(error);
  }
};

// Delete quote
export const deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findByIdAndDelete(
      req.params.id
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote request not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote request deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};