import { Context } from "hono";
import Income from '../models/income'
import Expense from "../models/expense";

export async function getAllExpenses(ctx:Context) {
  try {
    const expenses = await Expense.find().exec()
    return ctx.json(expenses)
  } catch (error) {
    return ctx.json({error} , 401)
  }
}

export async function getUserExpenses(ctx:Context) {
  try {
    const userId = ctx.req.param('userId')
    const userExpense = await Expense.find({userId : userId})
    return ctx.json(userExpense)
  } catch (error) {
    return ctx.json({error},400)
  }
}

export async function addUserExpense(ctx :Context) {
  try {
    const userId = ctx.req.param('userId')
    const body = await ctx.req.json()
    const newUserExpense = await new Expense({
      userId : userId,
      description : body.description,
      amount : body.amount,
      genre : body.genre
    }).save()
    return ctx.json(newUserExpense)
  } catch (error) {
    return ctx.json({error},401)
  }
}

export async function editUserExpense(ctx:Context) {
  try {
    const userId = ctx.req.param("userId")
    const expenseId = ctx.req.param("expenseId")
    const body = await ctx.req.json()
    const changedUserExpense = await Expense.findOneAndUpdate({_id : expenseId , userId :userId} , body , {new : true , runValidators : true})
    return ctx.json(changedUserExpense)
  } catch (error) {
    return ctx.json({error},400)
  }
  
}

export async function deleteUserExpense(ctx:Context) {
  try {
    const userId = ctx.req.param('userId')
    const expenseId = ctx.req.param('expenseId')
    const deletedUserIncome = await Expense.findOneAndDelete({_id : expenseId , userId : userId})
    return ctx.json(deleteUserExpense)
  } catch (error) {
    return ctx.json({error} , 400)
  }
  
}