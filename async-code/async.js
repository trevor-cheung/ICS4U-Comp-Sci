// console.log('1');
// setTimeout(() => {console.log('2')}, 500); // async task is queued after 500 ms
// console.log('3');
// console.log('4');

/* Callback functions --> no longer used. now we use promises.
function test(callback) {
    console.log(1);
    callback();
}

test(() => { console.log(2) });*/

async function test() {
    console.log(1);
    const resp = await test2();
    console.log(2);
    console.log('The result was: ' + resp);
    const resp = await test2();
    console.log(3);
    console.log("The result is: " + resp);
}

function test2() {
    return new Promise((resolve, reject) => {
        let i = 0;
        while (i < 10000000) {
            i++;
        }
        let success = false;
    
        if (success) {
            return resolve("This was good.");
        } else {
            return reject("This was bad.");
        }
    });
}

test();


/*p.then((result) => {
    return result;
}).then((resp) => {
    console.log("the result was: ") + resp;
}).catch((err) => {
    console.error(err);
});*/   
