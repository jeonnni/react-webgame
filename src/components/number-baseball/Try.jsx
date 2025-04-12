import { memo } from "react";

// memo 부모 컴포넌트가 바뀌었을 때 자식 컴포넌트까지 리렌더질 되는 것만 방지
const Try = memo( ({ tryInfo } ) => {

    return (
        <li>
            <div>
                {tryInfo.try}
            </div>
            <div>
                {tryInfo.result}
            </div>
        </li>
    );
});
Try.displayName = 'Try';
export default Try;