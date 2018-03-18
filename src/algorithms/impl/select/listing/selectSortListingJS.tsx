import * as React from "react";
import {Component} from "react";
import {CodeBlock} from "../../../../components/codeBlock/codeBlock";

export class SelectSortListingJS extends Component<{}, undefined> {

    render() {
        return (
            <div>
                <CodeBlock
                    ident={'for1.start'}
                    brace={true}
                    text={'for (var i = 0; i < arr.length - 1; i++)'}>
                    <CodeBlock
                        ident={'minStart'}
                        text={'var min = i;'}>
                    </CodeBlock>
                    <CodeBlock
                        ident={'for2.start'}
                        brace={true}
                        text={'for (var j = i + 1; j < arr.length; j++)'}>
                        <CodeBlock
                            ident={'compare'}
                            brace={true}
                            text={'if (arr[j] < arr[min])'}>
                            <CodeBlock
                                ident={'changeMin'}
                                text={'min = j;'}>
                            </CodeBlock>
                        </CodeBlock>
                    </CodeBlock>
                    <CodeBlock
                        ident={'permutation.temp'}
                        text={'var t = arr[min];'}>
                    </CodeBlock>
                    <CodeBlock
                        ident={'permutation.swap1'}
                        text={'arr[min] = arr[i];'}>
                    </CodeBlock>
                    <CodeBlock
                        ident={'permutation.swap2'}
                        text={'arr[i] = t;'}>
                    </CodeBlock>
                </CodeBlock>
            </div>
        );
    }
}