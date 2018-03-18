import {AbstractAlg} from "../../abstractAlg";
import {AbstractView} from "../../abstractView";
import {AlgorithmStep} from "../../algorithmStep";
import {ArrayElementHighlight} from "../../arrayElementHighlight";
import {memoize} from "core-decorators";
import {SelectSortListingJS} from "./listing/selectSortListingJS";
import {SelectSortListingSharp} from "./listing/selectSortListingSharp";

export class SelectSortAlg extends AbstractAlg {
    static id = 'SelectSort';

    makeSteps(): void {
        let steps = [];
        let array = this.arrayStore.getCloneElements();
        let count = array.length;

        let stepNumber = 0;
        let comparisonCount = 0;
        let permutationCount = 0;

        let step = AlgorithmStep.create("Начало сортировки")
            .setStepNumber(stepNumber)
            .setArray(array)
            .setComparisonCount(comparisonCount)
            .setPermutationCount(permutationCount);

        steps.push(step);
        steps.push(AlgorithmStep.clone(step).setListingLineIdent("for1.start"));

        for (let i = 0; i < count - 1; i++) {
            step = AlgorithmStep.clone(step)
                .setMessage(`Поиск минимального элемента - min=a[${i}]=${array[i].value}`)
                .setArray(array)
                .setListingLineIdent("minStart")
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.comparison(array[i])]);

            steps.push(step);

            let min = i;

            steps.push(AlgorithmStep.clone(step).setListingLineIdent("for2.start"));

            for (let j = i + 1; j < count; j++) {
                step = AlgorithmStep.clone(step)
                    .setMessage(`Поиск минимального элемента - сравнение a[${min}]=${array[min].value} и  a[${j}]=${array[j].value}`)
                    .setComparisonCount(++comparisonCount)
                    .setListingLineIdent("compare")
                    .setStepNumber(stepNumber++)
                    .setHighlightElements([ArrayElementHighlight.comparison(array[min]),
                        ArrayElementHighlight.comparison(array[j]),]);

                steps.push(step);

                if (array[j].value < array[min].value) {
                    step = AlgorithmStep.clone(step)
                        .setMessage(`a[${j}]=${array[j].value} < a[${min}]=${array[min].value}, минимальное значение min=a[${j}]=${array[j].value}`)
                        .setListingLineIdent("changeMin")
                        .setStepNumber(stepNumber++);

                    steps.push(step);

                    min = j;
                }

                steps.push(AlgorithmStep.clone(step).setListingLineIdent("for2.start"));
            }

            step = AlgorithmStep.clone(step)
                .setMessage(`Перестановка a[${i}]=${array[i].value} и a[${min}]=${array[min].value}`)
                .setPermutationCount(++permutationCount)
                .setStepNumber(stepNumber++)
                .setHighlightElements([ArrayElementHighlight.permutation(array[i]),
                    ArrayElementHighlight.permutation(array[min])]);


            steps.push(AlgorithmStep.clone(step).setListingLineIdent("permutation.temp"));

            let t = array[min];

            steps.push(AlgorithmStep.clone(step).setListingLineIdent("permutation.swap1"));

            array[min] = array[i];

            steps.push(AlgorithmStep.clone(step).setListingLineIdent("permutation.swap2"));

            array[i] = t;

            step = AlgorithmStep.clone(step).setArray(array).setListingLineIdent("for1.start");

            steps.push(step);
        }

        steps.push(AlgorithmStep.clone(step)
            .setListingLineIdent(null)
            .setHighlightElements([])
            .setComparisonCount(comparisonCount)
            .setPermutationCount(permutationCount)
            .setArray(array)
            .setMessage("Конец сортировки"));

        this.viewState.steps = steps;
        this.viewState.currentStep = steps[0];
    }

    @memoize
    getViews(): AbstractView[] {
        return [
            new AbstractView('JavaScript', SelectSortListingJS),
            new AbstractView('C#', SelectSortListingSharp)
        ];
    }

    getAlgName(): string {
        return "Сортировка выбором";
    }
}