// Employee Record Structure
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Process Array of Arrays into Array of Employee Records
function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

// Create Time-In Event
function createTimeInEvent(employee, dateTimeStamp) {
    let [date, hour] = dateTimeStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Create Time-Out Event
function createTimeOutEvent(employee, dateTimeStamp) {
    let [date, hour] = dateTimeStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Calculate Hours Worked on a Specific Date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate Wages Earned on a Specific Date
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    let payOwed = hoursWorked * employee.payPerHour;
    return payOwed;
}

// Calculate Total Wages for All Dates Worked
function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);

    let totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);

    return totalWages;
}

// Find Employee by First Name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculate Payroll for All Employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};
