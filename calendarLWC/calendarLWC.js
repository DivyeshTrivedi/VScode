import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import fullCalendar from '@salesforce/resourceUrl/fullCalendar';
import './CalendarLWC.css';


export default class CalendarLWC extends LightningElement {
    @track events;

    connectedCallback() {
        Promise.all([
            loadScript(this, fullCalendar + '/fullcalendar.min.js'),
            loadStyle(this, fullCalendar + '/fullcalendar.min.css')
        ])
            .then(() => {
                this.initializeCalendar();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading FullCalendar library',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    initializeCalendar() {
        const calendarEl = this.template.querySelector('#calendar');

        const calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['dayGrid', 'timeGrid', 'list'],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            events: this.events,
            eventClick: this.handleEventClick.bind(this)
        });

        calendar.render();
    }

    handleEventClick(info) {
        // Handle event click
    }
}
