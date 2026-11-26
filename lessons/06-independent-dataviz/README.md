# Lesson 6 · Independent data visualization project

About two to three 90-minute sessions.

What can you discover in the class workbook? Choose one question and use the shared Google Sheets data to answer it on a single page. Your page can be an infographic, a small dashboard, or an interactive data story.

Build on the application from Lessons 1–5 in your own GitHub fork. Use the existing `/api/data` route, Chart.js, HTML, CSS, and vanilla JavaScript. You can reuse `readings()`, `draw()`, and `participantDatasets()`. The techniques from the first five lessons are enough for this project.

## Suggested workflow

Complete the first three stages before coding. Discuss ideas and exchange feedback with a partner, then build and explain your own implementation.

1. **Explore the data.** Inspect the available measurements, units, dates, and gaps. Write at least three questions you could investigate.
2. **Choose a question and sketch the page.** Discuss your ideas with a partner. Pick one main question, explain why it matters, and sketch the page on paper or in FigJam. What will each visualization help the reader see?
   To compare chart types before you sketch, explore the live charts and example code in the [Chart.js samples](https://www.chartjs.org/docs/latest/samples/).
3. **Plan the calculation.** List the fields you need and what you will pair, group, count, or compare. Decide how to handle incomplete records.
4. **Implement the calculation.** Add at least one transformation or calculation of your own beyond those in Lessons 1–5. For example, counting days with a valid reading for each participant gives you a new measure using familiar array operations.
5. **Create the visualizations.** Show at least two related views that help answer your question. Add a summary statistic, such as the number of days covered, to give the charts context.
6. **Arrange the page.** Put the question where readers will see it first. Give each chart a descriptive title and clear labels, show units, and include a legend when colors or symbols need a key. Write a short interpretation that cites a result from the page.
7. **Test the results.** Check one calculated value by hand against the workbook. Check how missing dates, blank cells, and invalid values affect your result. Keep recorded zeros distinct from missing readings. Try the page at phone and desktop widths.
8. **Exchange feedback.** Test each other’s pages. Ask your partner to answer your question using the page before you explain it. Give feedback on chart clarity and usability, then revise your own page.
9. **Present your findings.** Show the page and explain how the data supports your answer.

## Possible research questions

Use these as starting points. Look for a question of your own that the available measurements can answer.

- On days with both readings, how does step count relate to screen time?

  <details>
  <summary>Hint: How can steps and screen minutes share one axis?</summary>

  Use the same dates for both series. Scale each step count against the highest step count in that period, and each screen-time reading against the highest number of screen minutes.

  **Formula:** $\text{percent of peak} = \frac{\text{daily value}}{\text{peak for that series}} \times 100$

  For example, if the peak is 8,000 steps, a day with 4,000 steps plots at 50%:

  ```javascript
  const dailySteps = 4000;
  const peakSteps = 8000;
  const percentOfPeak = (dailySteps / peakSteps) * 100; // 50
  ```

  Label the shared axis “% of each series’ peak”. If a series has no valid readings or its peak is zero, skip it and explain why.

  </details>

- How do steps per reporting participant differ between weekdays and weekends?
- Which apps account for the most recorded screen time?
- How much does daily screen time vary across participants?
- Which days show the most or least activity, and how many participants reported on those days?
- How complete are the step and screen-time records over the same period?
- Does the average describe a typical day, or do a few unusually high or low values change the picture?

Correlation does not imply causation. If two measurements change together, describe the pattern and acknowledge what the data can establish.

## Using AI

You are responsible for understanding the dataset, choosing and justifying your question and charts, planning the page, implementing the solution, checking the calculations, and interpreting the results. Be ready to explain one important function or transformation in your own words.

AI can explain a JavaScript concept or a Chart.js option, suggest approaches, help debug an error, review your code, or suggest ways to make the page easier to read. Ask for help with a specific decision or problem. Avoid asking AI to generate the whole project in one prompt.

## Assessment

| Criterion | Weight |
| --- | ---: |
| Research question and relevance of analysis | 25% |
| Correctness of data processing | 30% |
| Visualization quality and readability | 20% |
| Interpretation and conclusions | 15% |
| Ability to explain the implementation | 10% |

Choose the simplest design that makes your result clear. If it helps answer your question, you may add filters, participant or date-range selection, custom tooltips, other chart types, heatmaps, or more advanced statistics. These extensions are optional. Visual complexity earns no extra credit.

## Submission and presentation

Submit a link to the working application in your GitHub fork. Include a brief project description with your question, findings, and a short AI reflection. If you used AI, describe where it helped and what you changed or learned. If you worked without AI, say so.

In **3–5 minutes**, present your question, why you chose the visualizations, how you processed the data, and what you discovered. Explain one important function or transformation, one technical problem you encountered, and how you used AI if applicable. For anything you share publicly, use aggregated or anonymized data and keep identifiable personal measurements out of the page, screenshots, and repository.

**Done when** a reader can use your two visualizations and summary statistic to answer your question, and you can trace a result back to the workbook.

[Course overview](../../README.md) · [Previous lesson](../05-class-summary/README.md)
