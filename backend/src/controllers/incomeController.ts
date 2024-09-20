import { Context } from "hono";
import Income from '../models/income'
import { Mongoose } from "mongoose";

export async function getAllIncomes(ctx : Context) {
  try {
    const incomes = await Income.find().exec()
    return ctx.json(incomes)
  } catch (error) {
    return ctx.json({error}, 401)
  }  

}

export async function getUserIncomes(ctx : Context) {
  try {
    const userId = ctx.req.param('userId')
    const userIncome = await Income.find({userId : userId})
    return ctx.json(userIncome)
} catch (error) {
    return ctx.json({error} , 401)
  }
}

export async function addUserIncome(ctx : Context) {
  try {
    const userId = ctx.req.param('userId')
    const body = await ctx.req.json()
    const newUserIncome = await new Income({
      userId : userId,
      description : body.description,
      amount : body.amount , 
      genre : body.genre
    }).save()
    return ctx.json(newUserIncome)
  } catch (error) {
    return ctx.json({error} , 401)
  }
}

export async function editUserIncome(ctx:Context) {
  try{
    const incomeId = ctx.req.param('incomeId')
    const userId = ctx.req.param('userId')
    const body = await ctx.req.json()
    const changedUserIncome = await Income.findOneAndUpdate({_id : incomeId , userId : userId },body,{new : true})
    return ctx.json(changedUserIncome)
  } catch (error) {
    return ctx.json({error},400)
  }
}