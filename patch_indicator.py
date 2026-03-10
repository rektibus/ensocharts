import sys
import re

with open('src/view/IndicatorView.ts', 'r', newline='') as f:
    content = f.read()

content = content.replace("import CandleBarView, { type CandleBarOptions } from './CandleBarView'", "import ChildrenView from './ChildrenView'")
content = content.replace("export default class IndicatorView extends CandleBarView {", "export default class IndicatorView extends ChildrenView {")

# remove getCandleBarOptions
content = re.sub(r"  override getCandleBarOptions\(\)[\s\S]*? return null\r?\n  }\r?\n+", "", content)

# remove super.drawImp(ctx)
content = content.replace("super.drawImp(ctx)", "")

with open('src/view/IndicatorView.ts', 'w', newline='') as f:
    f.write(content)
