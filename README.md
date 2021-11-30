# create-journey-lambda
This lambda function will be used to create and add the journey to the journey-store DynamoDB table.

## Testing
```npm run test``` will run unit test

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
