from transformers import pipeline
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoModelForSeq2SeqLM
import numpy as np

# classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
# summarizer = pipeline("summarization", model="knkarthick/MEETING_SUMMARY")
zero_shot_classifier = AutoModelForSequenceClassification.from_pretrained("./model/bart-large-mnli")
zero_shot_classifier_tokenizer =  AutoTokenizer.from_pretrained("./model/bart-large-mnli")
summarizer_tokenizer = AutoTokenizer.from_pretrained("./model/MEETING_SUMMARY")
summarizer = AutoModelForSeq2SeqLM.from_pretrained("./model/MEETING_SUMMARY")

def model(text):
    
    candidate_labels = ['Medical', 'Food', 'Accommodation', 'Travel']
    results = []
    for candidate in candidate_labels:
        x = zero_shot_classifier_tokenizer.encode(text, candidate, return_tensors='pt',
                        truncation_strategy='only_first')
        logits = zero_shot_classifier(x)[0]
        entail_contradiction_logits = logits[:,[0,2]]
        probs = entail_contradiction_logits.softmax(dim=1)
        prob_label_is_true = probs[:,1].item()
        results.append(prob_label_is_true)
    label = candidate_labels[np.argmax(np.array(results))]
    if label == "Travel": 
        label = "Transport"

    inputs = summarizer_tokenizer([text], max_length=1024, return_tensors="pt")
    summary_ids = summarizer.generate(inputs["input_ids"], num_beams=2, min_length=0, max_length=20)
    summarized_text = summarizer_tokenizer.batch_decode(summary_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0]

    # summarized_text = summarizer(text)[0]["summary_text"]
    return label, summarized_text