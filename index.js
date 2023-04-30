/* Your Code Here */

//populates a record from an Array
//has a function called createEmployeeRecord:
function createEmployeeRecord(employeeInfo){
    const timeEventIn = [];
    const timeEventOut =[];
    return{
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: timeEventIn,
        timeOutEvents: timeEventOut
    }
}

// process an Array of Arrays into an Array of employee records
//has a function called createEmployeeRecords:
function createEmployeeRecords(employeeArray){
    const employeeArrayRecords = [];
    employeeArray.forEach(element => {
        employeeArrayRecords.push(createEmployeeRecord(element))
    });
    return(employeeArrayRecords);
}

// it adds a timeIn event Object to an employee's record of 
//timeInEvents when provided an employee record and Date/Time
// String and returns the updated record
//has a function called createTimeInEvent:
function createTimeInEvent(dateStamp){
    const dateSplit = dateStamp.split(" ");
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    }
    this.timeInEvents.push(timeIn);
    return(this)
}

//it adds a timeOut event Object to an employee's record of timeOutEvents 
//when provided an employee record and Date/Time String and returns the 
//updated record has a function called createTimeOutEvent:
function createTimeOutEvent(dateStamp){
    const dateSplitOut = dateStamp.split(" ");
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateSplitOut[1]),
        date: dateSplitOut[0]
    }
    this.timeOutEvents.push(timeOut);
    return (this);
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//hoursWorkedOnDate calculates the hours worked when given an employee record 
//and a date:
function hoursWorkedOnDate(date){
    let timeIn, timeOut;
    this.timeInEvents.forEach(i => {
        if(i['date'] === date){
            timeIn = i['hour']
        }
    })

    this.timeOutEvents.forEach(i =>{
        if(i['date'] === date){
            timeOut = i['hour']
        }
    })
    return((timeOut - timeIn) / 100)
}

// Given an employee record with a date-matched timeInEvent and timeOutEvent
//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour:
function wagesEarnedOnDate(date){
    return(
        this.payPerHour * hoursWorkedOnDate.call(this,date)
    )
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


// runs payroll using the mock data provided by Ultron data systems
//Dependent functions: findEmployeeByFirstName(collection, firstNameString)
//exists:
function findEmployeeByFirstName(srcArray, fName){
    let count = 0;
    let stop = 0;
    srcArray.forEach(function(employeeRecord,index){
        if(employeeRecord["firstName"] === fName){
            stop = index
        }
    })
    return(srcArray[stop])
 
}

//Using allWagesFor for each of the employees, accumulate the value of all
// dates worked by the employee in the record used as context. 
//Amount should be returned as a number.
function calculatePayroll(employeeRecArray){
    let payRollAll = 0;
    employeeRecArray.forEach(element => {
        payRollAll += allWagesFor.call(element)
    })
    return payRollAll
}