import {AbstractAlg} from "../abstractAlg";
import {AbstractView} from "../abstractView";
import {AlgorithmStep} from "../algorithmStep";


export class BubbleSortAlg extends AbstractAlg {
    static id = 'BubbleSortAlg';

    init(): void {
        let steps = [];
        let array = this.arrayStore.elements;
        let count = array.length - 1;

        let step: AlgorithmStep;

        step = new AlgorithmStep('Начали бля');
        step.isFacingStart();
        steps.push(step);

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count - i; j++) {
                steps.push(new AlgorithmStep(`Сравнение элементов i=${i} и j=${j}`));
                if (array[j] > array[j + 1]) {
                    let max = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = max;
                }
            }
        }

        step = new AlgorithmStep('Закончили нахуй');
        step.isFacingEnd();
        steps.push(step);

        this.viewState.steps = steps;
    }

    getViews(): AbstractView[] {
        return [];
    }
}