/*
    DO NOT MODIFY THE MAIN BRANCH OF jsonDataStructInterf.js unless YOUR MERGE IS APPROVED

    to test and modify the code, create your BRANCH
    before you merge your branch, the backend team must review YOUR BRANCH for APPROVAL!

*/

import  {ScheduledEvents, OwnerStatus, Ownership, JsonDataStruct} from './jsonDataStruct.js'
// loading a whole json to make a data struct
const whole_json = {
    name : 'whole tree',
    ownership : {
        name : 'sam',
        user_name : 'to',
        password : 'sam to'
    },
    owner_status : {
        max : 17,
        min : 0,
        mode : 3,
        median : 13
    },
    scheduled_events : [
        {
            year : 2019,
            month : 9,
            day : 9,
            hobby : 'coding',
            start : '9:00am',
            hours : 4,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 7,
            day : 1,
            hobby : 'typing',
            start : '11:00am',
            hours : 1,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 8,
            day : 2,
            hobby : 'reading',
            start : '12:00am',
            hours : 1,
            end : '1:00pm'
        },
        {
            year : 2020,
            month : 8,
            day : 2,
            hobby : 'reading',
            start : '4:00apm',
            hours : 1,
            end : '5:00pm'
        }
    ]
}
// pending documentation!
export default class jsonDataStructInterf {
    constructor(name){
        this.name = name;
        this.json_object = null;
    }

    use_default_json_data(){
        this.json_object = JsonDataStruct.fromJsonFormat(whole_json);
    }

    updateOwnership(name, user_name, password){
        let owner = {
            name : name,
            user_name : user_name,
            password : password
        }
        this.json_object.updateOwnership(owner);
    }

    addComplete_events(year, month, day, hobby, start, hours, end){
        let a_event = {
            year : year,
            month : month,
            day : day,
            hobby : hobby,
            start : start,
            hours : hours,
            end : end
        }
        this.json_object.addScheduled_event(a_event)
    }

    removeCompleted_event(){
        this.json_object.removeScheduled_event()
    }

    getJsonObjectString(){
        const json_string = JSON.stringify(this.json_object.toJsonFormat(), null, 2);
        return json_string;
    }


}