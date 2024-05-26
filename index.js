const fs = require('fs');
const {parse} = require('csv-parse');

const result=[];

function ishabitable(planet){
    if((planet['koi_disposition']=='CONFIRMED')&&planet['koi_insol']>0.36&&planet['koi_insol']<1.11&&planet['koi_prad']<1.6) return true;
    return false;
}
const readablestream=fs.createReadStream('Kepler_data.csv');
const parser=readablestream.pipe(parse({
    comment: '#',
    columns: true,
}));
parser.on('data',(data)=>{
    if(ishabitable(data))
        result.push(data['kepler_name'])
});
parser.on('error',(error)=>{
    console.log(error);
})
parser.on('end',()=>{
    console.log(result);
    console.log(`${result.length} Habitable Planets!`);
});
