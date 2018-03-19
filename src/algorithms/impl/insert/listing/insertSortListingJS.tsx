import * as React from "react";
import {Component} from "react";
import {CodeBlock} from "../../../../components/codeBlock/codeBlock";

export class InsertSortListingJS extends Component<{}, Readonly<{}>> {

    render() {
        return (
            <div>
                <CodeBlock
                    ident={'for.start'}
                    brace={true}
                    text={'for (var i = 0; i < arr.length; i++)'}>
                    <CodeBlock
                        ident={'selectElement1'}
                        text={'var j = i - 1;'}>
                    </CodeBlock>
                    <CodeBlock
                        ident={'selectElement2'}
                        text={'var v = arr[i];'}>
                    </CodeBlock>
                    <CodeBlock
                        ident={'compare'}
                        brace={true}
                        text={'while (j >= 0 && arr[j] > v)'}>
                        <CodeBlock
                            ident={'permutation'}
                            text={'arr[j + 1] = arr[j];'}>
                        </CodeBlock>
                        <CodeBlock
                            ident={'decrease'}
                            text={'j--;'}>
                        </CodeBlock>
                    </CodeBlock>
                    <CodeBlock
                        ident={'setPlace'}
                        text={'arr[j + 1] = v;'}>
                    </CodeBlock>
                </CodeBlock>
            </div>
        );
    }
}