// LINK TO DATABASE CONNECTION
const pool = require('./config.js')
const CLIENT_ID = '170958026096-1delfs3g8tg4hoeg6bgs5ickhpe7k5pt.apps.googleusercontent.com'
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// DEFINE APP
const router = app => {

    app.get('/', (request, response)=> {
        response.send("So this message is coming from your app, which is also known as your server!");
    });


    app.get('/home', (request, response)=>{
        homepage_file = "/Users/Seansmac/Desktop/Dev/Full_stack_for_absolute_beginners/myrepo/FullStackDev/homepage.html"
        response.sendFile(homepage_file)
    });

    app.get('/users', (request, response)=>{
        pool.query(`SELECT * FROM auth_data`, (error, result)=> {
        if(error) throw error;

        response.send(result);
        console.log('all users: ' + result);
        });
    
    });

 



    // POST NEW USER TO DATABASE

    // need to get safe user if from google (id token??)

    app.post('/newUser', async (request, response) => {
        console.log(request.body)
            var token = request.body.token
            var NewuserName = request.body.userName
            var NewuserEmail = request.body.userEmail

            //token = NewUserId
            // Check authenticity of user id
                const client = new OAuth2Client(CLIENT_ID);

                    async function verify() {
                    const ticket = await client.verifyIdToken({
                        idToken: token,
                        audience: CLIENT_ID,  
                    });
                    const payload = ticket.getPayload();
                    const userid = payload['sub'];
                    console.log('id verified!')
                    }
                verify().catch('error caught:', console.error);
                });





/*

            var NewUserDetails = {user_id: userid,  email: NewuserEmail}
            console.log('checking new user:', NewUserDetails)
                // check if user already exists in database
            try{
                pool.query("SELECT user_id FROM auth_data WHERE user_id = ?", NewUserId, function(error, result, field){
                    if (error) throw error;
                    console.log('error type:', error);

                    if(result.length === 0){
                        console.log('inserting new user')
                        //new user logic
                        pool.query('INSERT INTO auth_data SET ?', NewUserDetails, (error, result) => {
                            console.log('Post Success!');
                            //console.log('User ' + NewUserId + 'Written to database')
                        if (error) throw error;
                        console.log('error type:', error);
                        });  
                    }else{  
                        //existing user,
                        console.log("User already exists");

                        response.send("User already exists");
                    }
                });       
        } catch (err) {
            console.log('backend fail' + err)
        }
        
    })  
    */


};
module.exports = router;