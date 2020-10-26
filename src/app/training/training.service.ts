import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    
    exerciseChanged = new Subject<Exercise>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExcercise: Exercise;
    private exercises: Exercise[] = [];

    getAvailableExercises(){
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string){
        const selectedExercise = this.availableExercises.find( ex => ex.id === selectedId);
        this.runningExcercise = selectedExercise;
        this.exerciseChanged.next({...this.runningExcercise});
    }

    getRunningExercise(){
        return { ...this.runningExcercise };
    }

    completeExercise(){
        this.exercises.push({
            ...this.runningExcercise, 
            date: new Date(), 
            state:'completed'
         });
        this.runningExcercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number){
        this.exercises.push({
            ...this.runningExcercise, 
            duration: this.runningExcercise.duration * (progress/100), 
            calories: this.runningExcercise.calories * (progress/100), 
            date: new Date(), 
            state: 'canceled' 
        });
        this.runningExcercise = null;
        this.exerciseChanged.next(null);
    }

    getCompletedOrCanceledExercises(){
        return this.exercises.slice();
    }
}