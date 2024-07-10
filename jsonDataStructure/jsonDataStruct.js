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

import * as stats from 'simple-statistics'

class ScheduledEvents {
    constructor(year, month, day, an_event, start, hours, end) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.an_event = an_event;
        this.start = start;
        this.hours = hours;
        this.end = end;
    }

    toJsonFormat() {
        return {
            year : this.year,
            month : this.month,
            day : this.day,
            an_event : this.an_event,
            start : this.start,
            hours : this.hours,
            end : this.end,
        };
    }

    static fromJsonFormat(json) {
        return new ScheduledEvents(json.year, json.month, json.day, json.an_event, json.start, json.hours, json.end);
    }
}

class EventStatus {
    constructor(an_event, max, min, median, mode, mean, ratio, total, percent) {
        this.an_event = an_event;
        this.max = max;
        this.min = min;
        this.median = median;
        this.mode = mode;
        this.mean = mean
        this.ratio = ratio
        this.total = total
        this.percent = percent
    }

    toJsonFormat() {
        return {
            an_event : this.an_event,
            max : this.max,
            min : this.min,
            median : this.median,
            mode : this.mode,
            mean : this.mean,
            ratio : this.ratio,
            total : this.total,
            percent : this.percent
        }
    }

    static fromJsonFormat(json) {
        return new EventStatus(json.an_event, json.max, json.min, json.median, json.mode, json.mean, json.ratio, json.total, json.percent)
    }
}

class OwnerStatus {
    constructor(global_status, current_status_scope, an_event_status) {
        this.your_global_status = global_status;
        this.current_status_scope = current_status_scope;
        this.all_event_status = an_event_status;
    }

    toJsonFormat() {
        return {
            your_global_status : this.your_global_status,
            current_status_scope : this.current_status_scope,
            all_event_status : this.all_event_status.map(an_event_status => an_event_status.toJsonFormat()),
        };
    }

    static fromJsonFormat(json) {
        const all_event_status = json.all_event_status.map(an_event_status => EventStatus.fromJsonFormat(an_event_status));
        return new OwnerStatus(json.your_global_status, json.current_status_scope, all_event_status);
    }

    empty_all_event_status() {
        this.all_event_status = [];
    }

    addEvent_status(new_event) {
        this.all_event_status.push(new EventStatus(new_event.an_event, new_event.max, new_event.min, new_event.median, new_event.mode, new_event.mean, new_event.ratio, new_event.total, new_event.percent));
    }

    removeEvent_status() {
        this.all_event_status.pop()
    }
}

class Ownership {
    constructor(name, user_name, password) {
        this.name = name;
        this.user_name = user_name;
        this.password = password;
    }

    toJsonFormat(){
        return {
            name : this.name,
            user_name : this.user_name,
            password : this.password,
        };
    }

    static fromJsonFormat(json){
        return new Ownership(json.name, json.user_name, json.password);
    }
}


class JsonDataStruct {
    temp_event_list = [];
    temp_events_status = {an_event : '', max : 0, min : 0, median : 0, mode : 0}
    constructor(name, ownership, owner_status, scheduled_events){
        this.name = name;
        this.ownership = ownership;
        this.owner_status = owner_status;
        this.scheduled_events = scheduled_events;
    }

    toJsonFormat(){
        return {
            name: this.name,
            ownership : this.ownership.toJsonFormat(),
            owner_status : this.owner_status.toJsonFormat(),
            scheduled_events : this.scheduled_events.map(an_event => an_event.toJsonFormat()),
        };
    }

    static fromJsonFormat(json){
        const ownership = Ownership.fromJsonFormat(json.ownership);
        const owner_status = OwnerStatus.fromJsonFormat(json.owner_status);
        const scheduled_events = json.scheduled_events.map(an_event => ScheduledEvents.fromJsonFormat(an_event));
        return new JsonDataStruct(json.name, ownership, owner_status, scheduled_events);
    }

    getName(){
        return this.name;
    }

    updateName(newName){
        this.name = newName;
    }

    getOwnership(){
        return this.ownership;
    }

    updateOwnership(newOwnership){
        this.ownership = Ownership.fromJsonFormat(newOwnership);
    }

    get getOwner_status(){
        return this.owner_status;
    }

    emptyOwnerStatus() {
        this.owner_status.empty_all_event_status();
    }
    
    add_an_event_status_toOwnerStatus(new_event) {
        this.owner_status.addEvent_status(new_event);
    }

    remove_an_event_status_fromOwnerStatus() {
        this.owner_status.removeEvent_status();
    }

    getEvent_status() {
        return this.owner_status.toJsonFormat()
    }

    updateOwner_status(newOwner_status){
        this.owner_status = OwnerStatus.fromJsonFormat(newOwner_status)
        // this.owner_status = new OwnerStatus(newOwner_status.your_global_status, newOwner_status.current_status_scope, newOwner_status.all_event_status);
    }

    getScheduled_events(){
        return this.scheduled_events;
    }

    addScheduled_event(event){
        this.scheduled_events.push(new ScheduledEvents(event.year, event.month, event.day, event.an_event, event.start, event.hours, event.end))
    }

    removeScheduled_event(){
        this.scheduled_events.pop()
    }

    updateScheduled_events(newScheduled_events){
        this.scheduled_events = newScheduled_events.map(event => new ScheduledEvents(event.year, event.month, event.day, event.an_event, event.start, event.hours,event.end));
    }

    /*
        FUNCTION BELLOW ARE FOR FILTERING JSON ARRAYS
        THE INTENT IT TO MAKE A PIPELINE TO PROCESS DATA WITH ARRAY
        FOR EXAMPLE LIST.REDUCE(LIST.MAP(NAME) + NAME)
    */

    empty_temp_event_list(){
        this.temp_event_list = [];
    }

    init_temp_event_status(){
        this.temp_events_status = {an_event : '', max : 0, min : 0, median : 0, mode : 0, mean : 0, ratio : 0, total : 0, percent : 0 }
    }

    use_all_events_scheduled(){
        this.temp_event_list = this.scheduled_events;
    }

    filter_an_event_type(event_type) {
        let this_of_type_events = this.temp_event_list.filter(function(the_event) {
            return the_event.an_event === event_type;
        });
        this.temp_event_list = this_of_type_events;
        this.temp_events_status.an_event = event_type
        return this_of_type_events;
    }

    solve_total_of_all_event() {
        let total = 0;
        this.temp_event_list.forEach(function(the_event, index) {
            total = total + 1;
            // return the_event.hours;
        });
        this.temp_events_status.total = total;
        return total;
    }

    solve_min_of_all_events() {
        let list_of_hours = this.temp_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let min_value = stats.min(list_of_hours);
        this.temp_events_status.min = min_value;
        return min_value;
    }

    solve_max_of_all_events() {
        let list_of_hours = this.temp_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let max_value = stats.max(list_of_hours);
        this.temp_events_status.max = max_value;
        return max_value;
    }

    solve_median_of_all_events() {
        let list_of_hours = this.temp_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let median_value = stats.median(list_of_hours);
        this.temp_events_status.median = median_value;
        return median_value;
    }

    solve_mode_of_all_events() {
        let list_of_hours = this.temp_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let mode_value = stats.mode(list_of_hours);
        this.temp_events_status.mode = mode_value;
        return mode_value;
    }

    solve_mean_of_all_events() {
        let list_of_hours = this.temp_event_list.map(function(the_event) {
            return the_event.hours;
        });
        let mean_value = stats.mean(list_of_hours);
        this.temp_events_status.mean = mean_value;
        return mean_value;
    }


    compute_an_event_type_status(event_type) {
        this.empty_temp_event_list()
        this.init_temp_event_status()
        this.use_all_events_scheduled()
        this.filter_an_event_type(event_type)
        this.solve_min_of_all_events()
        this.solve_max_of_all_events()
        this.solve_median_of_all_events()
        this.solve_mode_of_all_events()
        this.solve_mean_of_all_events()
        this.solve_total_of_all_event()
        this.add_an_event_status_toOwnerStatus(this.temp_events_status)
    }
}

export {ScheduledEvents, OwnerStatus, Ownership, JsonDataStruct};
// export default OwnerStatus;