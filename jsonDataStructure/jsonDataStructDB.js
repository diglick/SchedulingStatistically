/* 
    **** Do NOT MODIFY! ****

    work is still in progress!

   **** PROTOTYPE json data structure ****


    if you want to study and edit the code, CREATE A NEW BRANCH.

    DO NOT MERGE you new branch, I must review your code and 
    understand the changes you have made! 

    ONLY! Once I ------- OFFICIALLY FORMATE the JsonDataStruct with Proper DOCUMENTATION -------, Only then
    will new changes be reviewed by the team for APPROVAL!

    Feel free to ask me any question! I Strongly recommend everyone to take their time
    to understand the jsonDataStruct. I would help so much with development. 
    BACKEND DEVs MUST THOUGH!



    HOW TO TEST THE CODE

    "Use and the jsonDataStructDebugTest.js to run and test the jsonDataStruct object"
    "run jsonDataStruct.html on a web browser get the console.log output with inspect command"
    "I use vscode with 'Live Server' extension to run the html on my local browser app"
    "DO NOT MERGE or push you testing code in the main branch"
*/

class DatabaseObj {
    constructor() {
        this.base_id = 'appujfaklryoZZPxX';
        this.auth_token = 'Bearer pateZMV3GBMLUVnWA.53e93b721f80534560c6592cfa282c13e9c8079387c3b79d033cd39956ee7d71';
        this.obj_type = '';
        this._user_id = null
        var Airtable = require('airtable');
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: this.auth_token
        });
        this.base = new Airtable({ apiKey: 'pateZMV3GBMLUVnWA.53e93b721f80534560c6592cfa282c13e9c8079387c3b79d033cd39956ee7d71' }).base('appujfaklryoZZPxX');
    }

    // typecheck that fields is a key value pair object
    // error check for same id in database
    async create(data) {
        return new Promise((resolve, reject) => {
            this.base(this.obj_type).create(data, function (err, record) {
                if (err) { reject(err); }
                else { resolve(record.getId()); }
            });
        });
    }

    async update() {
        return new Promise((resolve, reject) => {
            this.base(this.obj_type).find(this._user_id, function (err, record) {
                if (err) { reject(err); }
                else { resolve(record); }
            });
        });
    }

    export(data) {
        this.base(this.obj_type).update([
            {
                "id": this._user_id,
                "fields": data
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.get('Name'));
            });
        });
    }
}

class ScheduledEvent extends DatabaseObj {
    constructor(...args) {
        super();
        this.obj_type = 'ScheduledEvent';
        if (args.length == 1) {
            this._user_id = args[0];
            this._name = null;
            this._year = null;
            this._month = null;
            this._day = null;
            this._start = null;
            this._hours = null;
            this._end = null;
            this._max = null;
            this._min = null;
            this._median = null;
            this._mode = null;
            this.pullFromDB();
            return;
        }
        this._name = args[0];
        this._year = args[1];
        this._month = args[2];
        this._day = args[3];
        this._start = args[4];
        this._hours = args[5];
        this._end = args[6];
        this._max = args[7];
        this._min = args[8];
        this._median = args[9];
        this._mode = args[10]
    }

    get user_id() { return this._user_id; }

    get name() { return this._name; }

    get year() { return this._year; }

    get month() { return this._month; }

    get day() { return this._day; }

    get start() { return this._start; }

    get hours() { return this._hours; }

    get end() { return this._end; }

    get max() { return this._max; }

    get min() { return this._min; }

    get median() { return this._median; }

    get mode() { return this._mode; }

    set name(inputName) { this._name = inputName; }

    set year(inputYear) { this._year = inputYear; }

    set month(inputMonth) { this._month = inputMonth; }

    set day(inputDay) { this._day = inputDay; }

    set start(inputStart) { this._start = inputStart; }

    set hours(inputHours) { this._hours = inputHours; }

    set end(inputEnd) { this._end = inputEnd; }

    set max(inputMax) { this._max = inputMax; }

    set min(inputMin) { this._min = inputMin; }

    set median(inputMedian) { this._median = inputMedian; }

    set mode(inputMode) { this._mode = inputMode; }

    async createDBEntry() {
        try {
            this._user_id = await this.create(
                { ...this.exportToJson() }
            );
            console.log(this._user_id)
        } catch (error) {
            console.error(error);
        }
    }

    async pullFromDB() {
        try {
            let imported_obj = await this.update(this._user_id);
            this.name = imported_obj.fields.Name;
            this.year = imported_obj.fields.Year;
            this.month = imported_obj.fields.Month;
            this.day = imported_obj.fields.Day;
            this.start = imported_obj.fields.Start;
            this.hours = imported_obj.fields.Hours;
            this.end = imported_obj.fields.End;
            this.max = imported_obj.fields.Max;
            this.min = imported_obj.fields.Min;
            this.median = imported_obj.fields.Median;
            this.mode = imported_obj.fields.Mode;
        } catch (error) {
            console.error(error);
        }
    }

    exportToJson() {
        return {
            Name: this.name,
            Year: this.year,
            Month: this.month,
            Day: this.day,
            Start: this.start,
            Hours: this.hours,
            End: this.end,
            Max: this.max,
            Min: this.min,
            Median: this.median,
            Mode: this.mode
        };
    }

    updateFromJson(json) {
        // json = JSON.parse(json);
        json = JSON.stringify(json);
        json = JSON.parse(json);
        if (json.name != null) { this._name = json.name; }
        if (json.year != null) { this._year = json.year; }
        if (json.month != null) { this._month = json.month; }
        if (json.day != null) { this._day = json.day; }
        if (json.start != null) { this._start = json.start; }
        if (json.hours != null) { this._hours = json.hours; }
        if (json.end != null) { this._end = json.end; }
        if (json.max != null) { this._max = json.max; }
        if (json.min != null) { this._min = json.min; }
        if (json.median != null) { this._median = json.median; }
        if (json.mode != null) { this._mode = json.mode; }
    }

    exportToDB() {
        if (this._user_id != null) {
            this.export(this.exportToJson());
        } else {
            this._user_id = this.createDBEntry();
        }
    }

    updateFromDB() {
        imported_obj = this.update(this._user_id)
        if (imported_obj.name != null) { this.name = imported_obj.name; }
        if (imported_obj.year != null) { this.year = imported_obj.year; }
        if (imported_obj.month != null) { this.month = imported_obj.month; }
        if (imported_obj.day != null) { this.day = imported_obj.day; }
        if (imported_obj.start != null) { this.start = imported_obj.start; }
        if (imported_obj.hours != null) { this.hours = imported_obj.hours; }
        if (imported_obj.end != null) { this.end = imported_obj.end; }
        if (imported_obj.max != null) { this.max = imported_obj.max; }
        if (imported_obj.min != null) { this.min = imported_obj.min; }
        if (imported_obj.median != null) { imported_obj.median = imported_obj.median; }
        if (imported_obj.mode != null) { imported_obj.mode = imported_obj.mode; }
    }
}

class Ownership extends DatabaseObj {
    constructor(...args) {
        super();
        this.obj_type = 'Ownership';
        if (args.length == 1) {
            this._user_id = args[0];
            this._name = null;
            this._username = null;
            this._password = null;
            this.pullFromDB();
            return;
        }
        this._name = args[0];
        this._user_name = args[1];
        this._password = args[2];
    }

    get user_id() { return this._user_id; }

    get name() { return this._name; }

    get user_name() { return this._username; }

    get password() { return this._password; }

    set name(inputName) { this._name = inputName; }

    set user_name(inputUserName) { this._username = inputUserName; }

    set password(inputPassword) { this._password = inputPassword; }

    async createDBEntry() {
        try {
            this._user_id = await this.create(
                { ...this.exportToJson() }
            );
            console.log(this._user_id)
        } catch (error) {
            console.error(error);
        }
    }

    async pullFromDB() {
        try {
            let imported_obj = await this.update(this._user_id);
            this.name = imported_obj.fields.Name;
            this.user_name = imported_obj.fields.Username;
            this.password = imported_obj.fields.Password;
        } catch (error) {
            console.error(error);
        }
    }

    exportToJson() {
        return {
            Name: this.name,
            Username: this.user_name,
            Password: this.password
        };
    }

    importFromJson(json) {
        // json = JSON.parse(json);
        json = JSON.stringify(json);
        json = JSON.parse(json);
        if (json.name != null) { this.name = json.name; }
        if (json.username != null) { this.user_name = json.username; }
        if (json.password != null) { this.password = json.password; }
    }

    exportToDB() {
        if (this._user_id != null) {
            this.export(this.exportToJson());
        } else {
            this._user_id = this.createDBEntry();
        }
    }

    updateFromDB() {
        imported_obj = this.update(this._user_id)
        if (imported_obj.name != null) { this.name = imported_obj.name; }
        if (imported_obj.username != null) { this.user_name = imported_obj.username; }
        if (imported_obj.password != null) { this.password = imported_obj.password; }
    }

}


class JsonDataStruct {
    constructor(name, ownership, scheduled_events) {
        super();
        this.obj_type = 'DataStruct';
        if (args.length == 1) {
            this._user_id = args[0];
            this._name = null;
            this._ownership = null;
            this._scheduled_events = null;
            this.pullFromDB();
            return;
        }
        this._name = name;
        this._ownership = ownership;
        this._scheduled_events = scheduled_events;
    }

    get user_id() { return this._user_id; }

    get name() { return this._name; }

    get ownership() { return this._ownership; }

    get scheduled_events() { return this._scheduled_events; }

    set name(inputName) { this._name = inputName; }

    set ownership(inputOwnership) { this._ownership = inputOwnership; }

    set scheduled_events(inputScheduledEvents) { this._scheduled_events = inputScheduledEvents; }

    async createDBEntry() {
        try {
            this._user_id = await this.create(
                { ...this.exportToJson() }
            );
            console.log(this._user_id)
        } catch (error) {
            console.error(error);
        }
    }

    async pullFromDB() {
        try {
            let imported_obj = await this.update(this._user_id);
            this.name = imported_obj.fields.Name;
            this.ownership = imported_obj.fields.Ownership;
            this.scheduled_events = imported_obj.fields.ScheduledEvents;
        } catch (error) {
            console.error(error);
        }
    }

    exportToJson() {
        return {
            Name: this.name,
            Ownership: this.ownership,
            ScheduledEvents: this.scheduled_events
        };
    }

    updateFromJson(json) {
        // json = JSON.parse(json);
        json = JSON.stringify(json);
        json = JSON.parse(json);
        if (json.name != null) { this.name = json.name; }
        if (json.ownership != null) { this.ownership = json.ownership; }
        if (json.scheduled_events != null) { this.scheduled_events = json.scheduled_events; }
    }

    exportToDB() {
        if (this._user_id != null) {
            this.export(this.exportToJson());
        } else {
            this._user_id = this.createDBEntry();
        }
    }
}

export { ScheduledEvents, Ownership, JsonDataStruct };
// export default OwnerStatus;

// async function test() {
//     test_event = new ScheduledEvent("test", '2021', '12', '12', '12', '12', '12', '12', '12', '12', '12')
//     test_event.createDBEntry()
//     await new Promise(r => setTimeout(r, 2000));
//     // console.log(test_event.user_id)
//     console.log(test_event)
//     test_event.updateFromJson({
//         year: "912837",
//         month: "11"
//     })
//     test_event.exportToDB()
//     new_event = new ScheduledEvent(test_event.user_id)
//     // console.log(new_event)
// }
