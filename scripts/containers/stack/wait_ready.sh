echo -e "\x1B[31m======= Starting services initialization, wait until ready (5-7 minutes) ========\x1B[0m" && \
wait-on http-get://localhost:8080 && \
wait-on http-get://localhost:5000 && \
wait-on http-get://localhost:8081/healthz && \
wait-on http-get://localhost:3000/healthz && \
wait-on http-get://localhost:4000 && \
echo -e "\x1B[31m======== Synmetrix Stack is ready, go to http://localhost ========\x1B[0m"
