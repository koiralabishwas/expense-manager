type Subscription = {
  name : string,
  amount : number,
  paymentDay : number
  isActive : Boolean
}

type Preferences = {
  expenseGenres : [String],
  incomeGenres : [String]
  creditPaymentTiming : {
    delayMonth :number,
    day : number,
  }
  subscriptions : [Subscription]
}
