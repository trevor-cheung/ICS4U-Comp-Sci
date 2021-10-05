const companies = [
   { name: "Company One", category: "Finance", start: 1981, end: 2004 },
   { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
   { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
   { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
   { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
   { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
   { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
   { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
   { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

//let filteredAges = ages.filter(age => age > 30);

// if we input the {} we need to explicitly return a value
// if we only have a single parameter then we don't need ()
// same for the code.
let filteredAges = ages.filter(age => { return age > 30 });

/*
let filteredAges = ages.filter((age) => { return true });
*/

//filteredAges.forEach((age) => { console.log(age); });

// we can include the index if we want.
// backticks (``) allow us to create template literals (template strings). Use ${...} to access a variable
filteredAges.forEach((age, index) => console.log(`${index}: ${age}`));

let techCompanies = companies.filter(company => company.category === "Technology");

techCompanies.forEach(company => console.log(`${company.name}: ${company.start} - ${company.end}`));

// Ternary Operator -> ?

let age = 10;

let message = age > 30 ? 'You are old' : age < 10 ? 'You are very little' : 'You are not old yet';
console.log(message);

// think of sort like compareTo
//let sortedAges = ages.sort((a, b) => a > b ? 1 : -1);
let sortedAges = ages.sort((a, b) => a - b);
sortedAges.forEach(age => console.log(age));


let sortedCompanies = companies.sort((a, b) => a.start - b.start);
sortedCompanies.forEach(company => console.log(`${company.name} ${company.start} ${company.end}`));


let test = companies.map(company => `Hello ${company.name}`);
test.forEach(x => console.log(x));

let test1 = companies.map(company => {
   let t = {};
   t.property1 = company.start;
   t.property2 = company.end;
   return t;
});
test1.forEach(x => console.log(x));

let totalAge = ages.reduce((total, age) => total + age, 0);
console.log(totalAge);















