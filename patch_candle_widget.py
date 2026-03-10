import sys

with open('src/widget/CandleWidget.ts', 'r', newline='') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "CandleBarView" in line or "CandleAreaView" in line:
        continue
    new_lines.append(line)

with open('src/widget/CandleWidget.ts', 'w', newline='') as f:
    f.writelines(new_lines)
