import * as React from "react";
import {Component} from "react";
import {CodeBlock} from "../../../../components/codeBlock/codeBlock";

export class BubbleSortListingJS extends Component<{}, undefined> {

    render() {
        return (
            <div>
                <CodeBlock
                    text={'var arr'}>
                </CodeBlock>
                <CodeBlock
                    text={'var temp = 0'}>
                </CodeBlock>
                <CodeBlock
                    ident={'for1.start'}
                    brace={true}
                    text={'for (var write = 0; write < arr.length; write++)'}>
                    <CodeBlock
                        ident={'for2.start'}
                        brace={true}
                        text={'for (var sort = 0; sort < arr.length - 1; sort++)'}>
                        <CodeBlock
                            ident={'comparison'}
                            brace={true}
                            text={'if (arr[sort] > arr[sort + 1])'}>
                            <CodeBlock
                                ident={'permutation.temp'}
                                text={'temp = arr[sort + 1]'}>
                            </CodeBlock>
                            <CodeBlock
                                ident={'permutation.swap1'}
                                text={'arr[sort + 1] = arr[sort]'}>
                            </CodeBlock>
                            <CodeBlock
                                ident={'permutation.swap2'}
                                text={'arr[sort] = temps'}>
                            </CodeBlock>
                        </CodeBlock>
                    </CodeBlock>
                </CodeBlock>
            </div>
        );
    }
}