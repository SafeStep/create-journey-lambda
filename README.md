# create-journey-lambda
This lambda function will be used to create and add the journey to the journey-store DynamoDB table.

## Test Cases

## Information
##### Installation
Use `npm install`

##### Expected Parameters
```
{
  journey: {
    journeyID: "",
    userID: 0001,
    startTime: "",
    startPoint: ,
    endPoint: ,
    path: ,
    status: "pending"
    }
}
```

##### Running
Use `npm start`
It will also require the [journey-store](https://github.com/SafeStep/journey-store) table to be running