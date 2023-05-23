import axios from 'axios';
// import { useSession } from 'next-auth/react';
// const session = useSession();
// GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline&response_type=code',
//     scope: 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students',
// }),

export default async function listAssignments(courseId: string, accessToken: string) {
    console.log("access token:", accessToken);
    try {
        const response = await axios.get(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const assignments = response.data.courseWork;
        console.log(assignments);
    } catch (error) {
        console.log(error);
    }
}
// listAssignments("2hs45ud", session.accessToken);
// import { google } from 'googleapis';

// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
// //   "YOUR_REDIRECT_URL" // Replace with your redirect URL
// );

// // generate a url that asks permissions for Classroom's scopes
// const scopes = [
//   'https://www.googleapis.com/auth/classroom.courses.readonly',
//   'https://www.googleapis.com/auth/classroom.coursework.students.readonly'
// ];

// const url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',

//   // If you only need one scope you can pass it as a string
//   scope: scopes
// });

// // After getting the code from the OAuth URL, get the token
// oauth2Client.getToken(CODE_FROM_URL, function (err, token) {
//   if (err) return console.error('Error retrieving access token', err);
//   oauth2Client.credentials = token;

//   // Instantiate a classroom client
//   const classroom = google.classroom({ version: 'v1', auth: oauth2Client });

//   // List all courses
//   classroom.courses.list(function (err, res) {
//     if (err) return console.error('The API returned an error: ' + err);
//     const courses = res.data.courses;
//     if (courses && courses.length) {
//       console.log('Courses:');
//       courses.forEach((course, i) => {
//         console.log(`${i} - ${course.name}`);
        
//         // For each course, list all assignments
//         classroom.courses.courseWork.list({courseId: course.id}, function(err, res) {
//           if (err) return console.error('The API returned an error: ' + err);
//           const assignments = res.data.courseWork;
//           if (assignments && assignments.length) {
//             console.log('Assignments:');
//             assignments.forEach((assignment, i) => {
//               console.log(`${i} - ${assignment.title}`);
//             });
//           } else {
//             console.log('No assignments found.');
//           }
//         });
//       });
//     } else {
//       console.log('No courses found.');
//     }
//   });
// });