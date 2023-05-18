console.log('hello');

$.get('/api/realtors' , function (realtors) {
    console.log(realtors)
    let $body = $('body');
    for (let person in realtors) {
        let $div = $('<div>');
        $div.text(realtors[person].id + ' '+ realtors[person].name)
        $body.append($div)
    }
})