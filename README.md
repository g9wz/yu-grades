# Yu Grades 📚

<div align="center">

![GitHub](https://img.shields.io/github/license/g9wz/yu-grades?style=for-the-badge)
[![GitHub Issues](https://img.shields.io/github/issues/g9wz/yu-grades?style=for-the-badge)](https://github.com/g9wz/yu-grades/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/g9wz/yu-grades?style=for-the-badge)](https://github.com/g9wz/yu-grades/pulls)

</div>

This is a simple web app for [Yu](https://yu.edu.sa/) students to see their grades, something they can't do on the university portal.

## Serverless Function 🔄

One main serverless function, `grade.ts`, is used to fetch your grades from the university portal. It calls two APIs:

1. **Actor Details API**: This one grabs your details, like the current semester and all the semesters you've taken.
2. **Grades API**: This one pulls your course results for each specified semester.

They can't be called directly from the client side, hence the use of a serverless function to handle the requests.

> There’s mock data in dev mode if you want to play around locally.

## Disclaimer 🚨

The APIs used are built and maintained by the university and require basic student authentication (so, yes, we're allowed to use them - I guess?). If the university wants this taken down, just let me know :)
