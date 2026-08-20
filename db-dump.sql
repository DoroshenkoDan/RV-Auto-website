--
-- PostgreSQL database dump
--

\restrict QS0OY0IaDHhUL9MLM2we2muoGkGxNQSwYiChIsZ7HlpfGCTZ4xcAdJQPmbivYx7

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _locales; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public._locales AS ENUM (
    'uk',
    'en'
);


--
-- Name: enum_cars_drivetrain; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_cars_drivetrain AS ENUM (
    'AWD',
    '4WD',
    'FWD',
    'RWD'
);


--
-- Name: enum_cars_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_cars_status AS ENUM (
    'available',
    'inTransit',
    'auction'
);


--
-- Name: enum_cars_transmission; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_cars_transmission AS ENUM (
    'automatic',
    'manual'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cars (
    id integer NOT NULL,
    slug character varying NOT NULL,
    title character varying NOT NULL,
    status public.enum_cars_status NOT NULL,
    year numeric NOT NULL,
    mileage_km numeric NOT NULL,
    engine character varying NOT NULL,
    drivetrain public.enum_cars_drivetrain NOT NULL,
    transmission public.enum_cars_transmission NOT NULL,
    current_bid numeric,
    price numeric NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    vin character varying,
    featured boolean DEFAULT false
);


--
-- Name: cars_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cars_features (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL
);


--
-- Name: cars_features_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cars_features_locales (
    value character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: cars_features_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cars_features_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cars_features_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cars_features_locales_id_seq OWNED BY public.cars_features_locales.id;


--
-- Name: cars_gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cars_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


--
-- Name: cars_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;


--
-- Name: cars_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cars_locales (
    damage_tag character varying,
    location_note character varying,
    eta_note character varying,
    auction_note character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL,
    description character varying
);


--
-- Name: cars_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cars_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cars_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cars_locales_id_seq OWNED BY public.cars_locales.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: media_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_locales (
    alt character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: media_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_locales_id_seq OWNED BY public.media_locales.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    cars_id integer,
    team_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: team; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team (
    id integer NOT NULL,
    photo_id integer,
    start_year numeric NOT NULL,
    cars_delivered numeric NOT NULL,
    "order" numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- Name: team_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_locales (
    name character varying NOT NULL,
    role character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: team_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_locales_id_seq OWNED BY public.team_locales.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: cars id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);


--
-- Name: cars_features_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_features_locales ALTER COLUMN id SET DEFAULT nextval('public.cars_features_locales_id_seq'::regclass);


--
-- Name: cars_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_locales ALTER COLUMN id SET DEFAULT nextval('public.cars_locales_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: media_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_locales ALTER COLUMN id SET DEFAULT nextval('public.media_locales_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: team id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- Name: team_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_locales ALTER COLUMN id SET DEFAULT nextval('public.team_locales_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cars (id, slug, title, status, year, mileage_km, engine, drivetrain, transmission, current_bid, price, updated_at, created_at, vin, featured) FROM stdin;
1	toyota-rav4-xle	Toyota RAV4 XLE	inTransit	2019	20000	2.5	4WD	automatic	\N	43000	2026-08-13 15:18:15.62+00	2026-08-13 15:12:17.778+00	\N	t
3	toyota-rav4-xle-2015	Toyota RAV4 XLE	available	2015	12000	2.5	AWD	automatic	\N	12000	2026-08-13 15:19:15.084+00	2026-08-13 15:19:15.084+00	\N	t
4	Toyota-Rav4Test	Toyota RAV4 Test	auction	2021	245005	3500	4WD	automatic	\N	50000	2026-08-13 16:58:22.267+00	2026-08-13 16:52:17.306+00	\N	t
5	bmw-320i-xdrive	BMW 320i xDrive	available	2020	50614	2.8L	AWD	automatic	\N	17900	2026-08-13 17:00:24.694+00	2026-08-13 17:00:24.694+00	WBA8E9G50JNU12345	t
6	ford-f150-xlt	Ford F-150 XLT	inTransit	2021	46314	3.5L	4WD	automatic	\N	22400	2026-08-13 17:00:24.704+00	2026-08-13 17:00:24.704+00	\N	f
7	tesla-model-3-long-range	Tesla Model 3 Long Range	inTransit	2022	30964	Електро	AWD	automatic	\N	19600	2026-08-13 17:00:24.711+00	2026-08-13 17:00:24.711+00	5YJ3E1EA1NF123456	t
8	chevrolet-tahoe-lt	Chevrolet Tahoe LT	auction	2019	94806	5.3L	4WD	automatic	9400	14800	2026-08-13 17:00:24.718+00	2026-08-13 17:00:24.718+00	\N	f
9	honda-crv-ex	Honda CR-V EX	auction	2020	71326	1.5T	AWD	automatic	7800	12200	2026-08-13 17:00:24.725+00	2026-08-13 17:00:24.725+00	\N	t
10	FordMondeo343	Ford Mondeo	auction	2016	150000	2000	AWD	manual	\N	9000	2026-08-17 11:38:54.911+00	2026-08-17 11:38:54.911+00	\N	f
\.


--
-- Data for Name: cars_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cars_features (_order, _parent_id, id) FROM stdin;
1	5	6a7df82843b4482374c1c7a9
2	5	6a7df82843b4482374c1c7aa
1	7	6a7df82843b4482374c1c7ab
2	7	6a7df82843b4482374c1c7ac
\.


--
-- Data for Name: cars_features_locales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cars_features_locales (value, id, _locale, _parent_id) FROM stdin;
\.


--
-- Data for Name: cars_gallery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cars_gallery (_order, _parent_id, id, image_id) FROM stdin;
1	4	6a7df5e4df24513a94afbcbd	3
2	4	6a7df5eedf24513a94afbcbf	2
3	4	6a7df5fcdf24513a94afbcc1	1
1	5	mig-5	1
1	8	mig-8	1
1	6	mig-6	1
1	1	mig-1	1
1	3	mig-3	1
1	9	mig-9	1
1	7	mig-7	1
\.


--
-- Data for Name: cars_locales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cars_locales (damage_tag, location_note, eta_note, auction_note, id, _locale, _parent_id, description) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
1	2026-08-13 15:11:30.106+00	2026-08-13 15:11:30.106+00	/api/media/file/Toyota%20RAV4%202019.jpg	\N	Toyota RAV4 2019.jpg	image/jpeg	82200	382	239	50	50
2	2026-08-13 16:50:04.215+00	2026-08-13 16:50:04.215+00	/api/media/file/rav4.2.avif	\N	rav4.2.avif	image/avif	179047	2560	1600	50	50
3	2026-08-13 16:50:17.065+00	2026-08-13 16:50:17.065+00	/api/media/file/rav4.3.avif	\N	rav4.3.avif	image/avif	32153	1600	1067	50	50
\.


--
-- Data for Name: media_locales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_locales (alt, id, _locale, _parent_id) FROM stdin;
Toyota RAV4 XLE	1	uk	1
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
3	\N	2026-08-13 16:53:28.851+00	2026-08-13 16:53:28.851+00
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, cars_id, team_id) FROM stdin;
5	\N	3	document	\N	\N	3	\N
6	\N	3	user	1	\N	\N	\N
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
2	20260820_154406_initial	1	2026-08-20 15:44:47.114+00	2026-08-20 15:44:47.114+00
4	20260820_154550_add_team	2	2026-08-20 15:51:49.082+00	2026-08-20 15:51:49.082+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
1	collection-users	{}	2026-08-13 13:09:39.281+00	2026-08-13 13:09:39.281+00
2	collection-media	{"limit": 10, "editViewType": "default"}	2026-08-13 15:10:36.567+00	2026-08-13 13:09:41.78+00
3	collection-cars	{"limit": 10, "editViewType": "default"}	2026-08-13 15:10:38.121+00	2026-08-13 15:09:10.967+00
4	locale	"uk"	2026-08-13 15:17:47.115+00	2026-08-13 15:16:16.197+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
1	\N	1	user	1
6	\N	2	user	1
7	\N	3	user	1
11	\N	4	user	1
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.team (id, photo_id, start_year, cars_delivered, "order", updated_at, created_at) FROM stdin;
1	\N	2017	260	0	2026-08-20 15:54:58.271+00	2026-08-20 15:54:58.244+00
2	\N	2019	180	1	2026-08-20 15:54:58.286+00	2026-08-20 15:54:58.278+00
3	\N	2021	160	2	2026-08-20 15:54:58.3+00	2026-08-20 15:54:58.292+00
\.


--
-- Data for Name: team_locales; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.team_locales (name, role, id, _locale, _parent_id) FROM stdin;
Андрій Ковальчук	Засновник · підбір і торги	2	uk	1
Andrii Kovalchuk	Founder · sourcing & auctions	3	en	1
Ігор Мельник	Логістика та розмитнення	5	uk	2
Ihor Melnyk	Logistics & customs clearance	6	en	2
Олена Гриценко	Менеджер супроводу клієнтів	8	uk	3
Olena Hrytsenko	Client support manager	9	en	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	2026-08-13 13:09:30.386+00	2026-08-13 13:09:30.386+00	doroshenko.daniil.a@gmail.com	\N	\N	3480da76b8c6e0014ed044e7c3c207cdcb707955fb9631bad1ede518ca17014a	cdd65393dbcdb6620c61c08de7bcd8036eaec63f8f390d7dedeca33af0c5605aebec81fa3a9ec24aedac662bbf57bb5d491aa0670973d40acb647d00cd9edfed5a96532238566a535686cb419f158344170e76ca0312fb6528ab9eda914ec9886d0b5c280d8272e48129611906b65936677dffdc9d046d1f5168115ecfa498be6155e29fca626af3f428f2ee3512728e337db55bd291f0e5332ad47ecd966bb40be662008375c8e87e897969dadb5e30e3deba26c11876b191e447cabff7e1ab460d254ffe80a30c9e7a734a9a3ddda45cb8d27134d08eb4f5d28976a410cf02796add5cda07efd043cc3de155602ace8be5dca3c838622eb120243fd6818721f2ae3feb7d93be32b1e3d99a1756b95a20f9c801e3c300e2cd94d955d0a9a72c330cd2d962048b91061ed308e37cf1f0a8656da94443d47bce91f09353b3b96982197a4eb485fdc667a86d3a0b2a499b1df86af9504453fc6b1d786e6b25215ebe5fb782c2465a619cc9da4eaac3c1d68703f19791a65be8b35f8591f09698f3e303da5ccd7697eb300416a90de4f015c7247ab5bd59acc9a2ad635251ce2427584797db0b7dd9ab5edda77461d0e35cdc0426825d619a2799bb3c34430da558f23a942252e79e78cc4a00a3fa7a125211455248880f0f6a6e0158236b00beacea260f09bcdea4be332b19f5d2c8047d538bb4cef8280e6ac8ae0208e78a7f18	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	dc62a2bb-4a97-406b-b2b1-e4437826e25f	2026-08-17 11:35:25.03+00	2026-08-17 13:35:25.03+00
\.


--
-- Name: cars_features_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cars_features_locales_id_seq', 1, false);


--
-- Name: cars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cars_id_seq', 10, true);


--
-- Name: cars_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cars_locales_id_seq', 1, false);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 3, true);


--
-- Name: media_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_locales_id_seq', 1, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 5, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 10, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 5, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 4, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 11, true);


--
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.team_id_seq', 3, true);


--
-- Name: team_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.team_locales_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: cars_features_locales cars_features_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_features_locales
    ADD CONSTRAINT cars_features_locales_pkey PRIMARY KEY (id);


--
-- Name: cars_features cars_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_features
    ADD CONSTRAINT cars_features_pkey PRIMARY KEY (id);


--
-- Name: cars_gallery cars_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_gallery
    ADD CONSTRAINT cars_gallery_pkey PRIMARY KEY (id);


--
-- Name: cars_locales cars_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_locales
    ADD CONSTRAINT cars_locales_pkey PRIMARY KEY (id);


--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);


--
-- Name: media_locales media_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_locales
    ADD CONSTRAINT media_locales_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: team_locales team_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_locales
    ADD CONSTRAINT team_locales_pkey PRIMARY KEY (id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: cars_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_created_at_idx ON public.cars USING btree (created_at);


--
-- Name: cars_features_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX cars_features_locales_locale_parent_id_unique ON public.cars_features_locales USING btree (_locale, _parent_id);


--
-- Name: cars_features_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_features_order_idx ON public.cars_features USING btree (_order);


--
-- Name: cars_features_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_features_parent_id_idx ON public.cars_features USING btree (_parent_id);


--
-- Name: cars_gallery_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_gallery_image_idx ON public.cars_gallery USING btree (image_id);


--
-- Name: cars_gallery_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_gallery_order_idx ON public.cars_gallery USING btree (_order);


--
-- Name: cars_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_gallery_parent_id_idx ON public.cars_gallery USING btree (_parent_id);


--
-- Name: cars_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX cars_locales_locale_parent_id_unique ON public.cars_locales USING btree (_locale, _parent_id);


--
-- Name: cars_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX cars_slug_idx ON public.cars USING btree (slug);


--
-- Name: cars_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cars_updated_at_idx ON public.cars USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_locales_locale_parent_id_unique ON public.media_locales USING btree (_locale, _parent_id);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_cars_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_cars_id_idx ON public.payload_locked_documents_rels USING btree (cars_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_team_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_team_id_idx ON public.payload_locked_documents_rels USING btree (team_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: team_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX team_created_at_idx ON public.team USING btree (created_at);


--
-- Name: team_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX team_locales_locale_parent_id_unique ON public.team_locales USING btree (_locale, _parent_id);


--
-- Name: team_photo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX team_photo_idx ON public.team USING btree (photo_id);


--
-- Name: team_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX team_updated_at_idx ON public.team USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: cars_features_locales cars_features_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_features_locales
    ADD CONSTRAINT cars_features_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.cars_features(id) ON DELETE CASCADE;


--
-- Name: cars_features cars_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_features
    ADD CONSTRAINT cars_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.cars(id) ON DELETE CASCADE;


--
-- Name: cars_gallery cars_gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_gallery
    ADD CONSTRAINT cars_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: cars_gallery cars_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_gallery
    ADD CONSTRAINT cars_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.cars(id) ON DELETE CASCADE;


--
-- Name: cars_locales cars_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars_locales
    ADD CONSTRAINT cars_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.cars(id) ON DELETE CASCADE;


--
-- Name: media_locales media_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_locales
    ADD CONSTRAINT media_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_cars_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_cars_fk FOREIGN KEY (cars_id) REFERENCES public.cars(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_team_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_team_fk FOREIGN KEY (team_id) REFERENCES public.team(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: team_locales team_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_locales
    ADD CONSTRAINT team_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.team(id) ON DELETE CASCADE;


--
-- Name: team team_photo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_photo_id_media_id_fk FOREIGN KEY (photo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict QS0OY0IaDHhUL9MLM2we2muoGkGxNQSwYiChIsZ7HlpfGCTZ4xcAdJQPmbivYx7

