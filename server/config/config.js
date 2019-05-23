// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/gameverbs';
}else{

    urlDB = 'mongodb+srv://robert:BNu2vt58iAPZCsMn@cluster0-cpmlz.mongodb.net/gameverbs?retryWrites=true';
}
process.env.URLDB = urlDB;