import React from 'react';
import axios from 'axios';

function Test() {
    function allStorage() {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        return values;
    }

    let test = async () => {
        let a = allStorage;

        console.log(window.localStorage.getItem("token"));

        /* await axios.post('http://localhost:5000/check', {}, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25maWciOnsibmFtZSI6InRlc3RtYW4iLCJpZCI6IjYyZWYwOTcwY2I5MzRiNTBlYzJjMTU2MCJ9LCJkYXRlIjoxNjU5ODM0MzYzNDg4LCJpYXQiOjE2NTk4MzQzNjN9.tSDg9GVFZP6YniWwH66WGBikF4uxL5-jyAfiIZw1akk"
            }
        }).then((res) => {
            console.log(res);
        }) */
    }

    test();
    return (
        <div>
            <button>test</button>
        </div>
    );
}

export default Test;