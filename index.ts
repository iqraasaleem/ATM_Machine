import  inquirer  from 'inquirer';
import { faker } from '@faker-js/faker';
import { first } from 'rxjs';


// requirement
// 1 user data  = done
// 2 atm machine = done
// 3 atm machine's function

interface User {
    id : number
    pin : number
    name : string
    account_number : number
    balance : number
}
const create_user =() => {
    let users: User[] = []
    
    for(let i = 0; i<50; i++){
        let user : User = {
            id : i,
            pin : 100 + i,
            name : faker.person.fullName(),
            account_number : Math.floor(100000000 * Math.random()*900000000),
            balance : 1000000 * i
        }

        users.push(user)
    }


    return users
};
// atm machine

const atm_machine = async(users : User[]) => {

    const Response = await inquirer.prompt({
        type : "number",
        message : "Write Your Pin Code",
        name : "pin"
    })
     //console.log("welcome account holder");
     
    console.log(Response);
    const user = users.find(val => val.pin == Response.pin)
    
    if (user) {
        console.log(`Welcome ${user.name}`)
        atm_function(user)
        return 
    }
    console.log("Invalid Pin");
}
// atm function

const atm_function = async(user : User) => {
    const answer = await inquirer.prompt({
        type : "list",
        name : "select",
        message : "Which Service Do You Want",
        choices : ["withdraw money","balance","want to exit","deposit"]
    })
    
    if (answer.select == "withdraw money") {
        const amount = await inquirer.prompt({
            type : "number",
            message : "Anter Amount ?",
            name : "rupee"
        })

        if (amount.rupee > user.balance) {
            return console.log("Apka mujooda balance nakafi hai..")       
        }
        if (amount.rupee > 25000) {
            return console.log("App 20000 se ziada ki amount nahi nikal saktey!")      
        }

        console.log(`Withdraw Amount: ${amount.rupee}`)
        console.log(`Balance: ${user.balance-amount.rupee}`)
    }
    if (answer.select == "balance") {
        console.log(`Balance: ${user.balance}`)
        return
    } 
    if (answer.select == "deposit") {
        const deposit = await inquirer.prompt({
            type : "number",
            message : "Enter Deposit Amount ?",
            name : "rupee"
        })
        console.log(`Diposit Amount: ${deposit.rupee}`)
        console.log(`Total Balance: ${user.balance + deposit.rupee}`)
    }
     
    if (answer.select == "want to exit") {
        console.log("THANK YOU FOR USING ATM...");
        
        
    }
}

const users = create_user();

atm_machine(users)



