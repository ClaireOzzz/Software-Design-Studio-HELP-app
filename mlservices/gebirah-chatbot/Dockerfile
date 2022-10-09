FROM ruby:2.7.6


RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		postgresql-client \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY . .

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
# Redirect Rails log to STDOUT for Cloud Run to capture
ENV RAILS_LOG_TO_STDOUT=true
ENV SECRET_KEY_BASE=5ef18b5961b3725c9d6e6d0c1b91ad8f5b64ab8c8d4b1fd03abe43bbfa119bf125092fbce9d231bbd652c49d5c20c423ce3667d1fe957273ffad259e6ca4643f

# pre-compile Rails assets with master key
RUN bundle exec rake assets:precompile


ENV RAILS_ENV=production

RUN bundle exec rake db:create
RUN bundle exec rake db:migrate
RUN bundle exec rake db:seed

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]

