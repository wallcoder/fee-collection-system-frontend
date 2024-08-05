
import mysql from 'mysql';


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fee_collection_system',
    port: 3306

} 
)

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('MySQL connected successfully...');
});


export default db;