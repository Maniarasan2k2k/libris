import express from 'express';
const router = express.Router();
import { addMember, getAllMembers, getMemberById, updateMember, deleteMember } from '../controllers/memberController.js';

router.route('/')
  .post(addMember)
  .get(getAllMembers);

router.route('/:id')
  .get(getMemberById)
  .put(updateMember)
  .delete(deleteMember);

export default router;
