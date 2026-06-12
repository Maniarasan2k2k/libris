import Member from '../models/Member.js';

// @desc    Add a new library member
// @route   POST /api/members
// @access  Public (Admin)
export const addMember = async (req, res) => {
  try {
    const { name, email, phone, department, memberType } = req.body;

    // Check if email already exists
    const emailExists = await Member.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ message: 'A member with this email already exists' });
    }

    const member = await Member.create({
      name,
      email,
      phone,
      department,
      memberType,
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all members (with optional type filtering)
// @route   GET /api/members
// @access  Public (Admin)
export const getAllMembers = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};

    if (type) {
      query.memberType = type;
    }

    const members = await Member.find(query).sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single member by ID
// @route   GET /api/members/:id
// @access  Public (Admin)
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update member info by ID
// @route   PUT /api/members/:id
// @access  Public (Admin)
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check if email is being changed and is already taken
    if (req.body.email && req.body.email.toLowerCase() !== member.email) {
      const emailExists = await Member.findOne({ email: req.body.email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: 'A member with this email already exists' });
      }
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a member record by ID
// @route   DELETE /api/members/:id
// @access  Public (Admin)
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
