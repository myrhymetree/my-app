import * as tf from '@tensorflow/tfjs';
import React, { useEffect, useState, useCallback } from 'react';

function Qna() {
  const [values, setValues] = useState([]);

  const qna = require('@tensorflow-models/qna');

  async function qnatest() {
    const passage = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
    const question = "Who is the CEO of Google?"
    
    const model = await qna.load();

    // Finding the answers
    const answers = await model.findAnswers(question, passage);
    console.log(answers);
    setValues(answers);
  }

  useEffect(() => {
    qnatest()
  },[])

  return (
    <>
      <h1>얼굴 랜드마크</h1>
      
      <div id="micro-out-div">
        <table style={{border: '1px solid black'}}>
          <tr>
            <th>startIndex</th>
            <th>endIndex</th>
            <th>score</th>
            <th>text</th>
          </tr>
          <tr>
            <td>
              {
                values.map(value => <li>{value.startIndex}</li>)
              }
            </td>
            <td>
              {
                values.map(value => <li>{value.endIndex}</li>)
              }
            </td>
            <td>
              {
                values.map(value => <li>{value.score}</li>)
              }
            </td>
            <td>
              {
                values.map(value => <li>{value.text}</li>)
              }
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Qna;
