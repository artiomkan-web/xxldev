'use strict'

window.addEventListener('DOMContentLoaded', ()=> {

    // === HEADER === \\\
    let header = document.querySelector('header'),
        headerBurger = document.querySelector('.burger'),
        headerMenu = header.querySelector('.header__menu'),
        menuItems = header.querySelectorAll('.menu__item')
    
    window.addEventListener('scroll', ()=>{
        if (window.pageYOffset > 0 ){
            header.classList.add('_scroll')
        }
        else{
            header.classList.remove('_scroll')
        }
    })

    headerBurger.addEventListener('click', toggleMenu)
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu)
    })
    function toggleMenu() {
        headerMenu.classList.toggle('_active')
        headerBurger.classList.toggle('_active')
        document.body.classList.toggle('lock')
    }
    function closeMenu() {
        headerMenu.classList.remove('_active')
        headerBurger.classList.remove('_active')
        document.body.classList.remove('lock')
    }
    document.addEventListener('click', (e) => {
        let withinBoundaries = e.composedPath().includes(headerMenu);
            
        if ( !withinBoundaries && !e.composedPath().includes(headerBurger)) {
            closeMenu()
        }
    })

    /// === SMOOTH SCROLL === \\\
    let anchors = document.querySelectorAll('section'),
        anchorsLinks = document.querySelectorAll('a[href^="#"]')
    
    // anchorsLinks.forEach(link => {
    //     let linkId = link.getAttribute('href')
    //     link.setAttribute('href', linkId + '_anchor')
    // });
    anchors.forEach(item => {
        let ancId = item.id
        
        item.insertAdjacentHTML('afterbegin', `<div class="anchor" style='top: -${header.offsetHeight}px; position: relative;' id=${ancId}_anchor></div>`)
    })

    /// === WHAT YOU GET === \\\
    let benefits = document.querySelector('.benefits'),
        benefitsHeader = benefits.querySelector('.benefits__header'),
        benefitsHeaderTop = 0

    if (window.matchMedia('(min-width: 992.1px)').matches){
        benefitsHeader.style.width = benefitsHeader.offsetWidth + 'px'
        window.addEventListener('scroll', ()=>{
            if (benefitsHeaderTop + (-1 * benefits.getBoundingClientRect().top) > 40){
                benefits.style.transform = 'none'
            }
        })
    }

    /// === SLICK SLIDER === \\\
    $('.projects__list').slick({
        arrows : true,
        dots: false,
        // appendDots: categoriesDots,
        slidesToShow: 3,
        variableWidth: true,
        appendArrows: document.querySelector('.projects__arrows'),
        prevArrow: '<button class="slider__toggle _prev"><i class="slider__icon icon-arrow2-left"></i></button>',
        nextArrow: '<button class="slider__toggle _next"><i class="slider__icon icon-arrow2-right"></i></button>',
        infinite: true,
        responsive: [
            {
              breakpoint: 992.1,
              settings: {
                slidesToShow: 2,
                variableWidth: false,
              }
            },
            {
              breakpoint: 480.1,
              settings: {
                slidesToShow: 1,
                variableWidth: false,
              }
            },
            // {
            //   breakpoint: 360.1,
            //   settings: {
            //       slidesToShow: 1,
            //   }
            // }
        ]
    })
    $('.collaborates__list').slick({
        arrows : false,
        dots: true,
        slidesToShow: 1,
        appendDots: document.querySelector('.collaborates__dots'),
        infinite: true,
        customPaging : function(slider, i) {
            return ' <div></div>';
        },
        // responsive: [
        //     {
        //       breakpoint: 768.1,
        //       settings: {
        //           slidesToShow: 2,
        //       }
        //     },
        //     {
        //       breakpoint: 360.1,
        //       settings: {
        //           slidesToShow: 1,
        //       }
        //     }
        // ]
    })
    $('.team__list').slick({
        arrows : true,
        dots: false,
        slidesToShow: 1,
        appendArrows: document.querySelector('.team__arrows'),
        prevArrow: '<button class="slider__toggle _prev"><i class="slider__icon icon-arrow2-left"></i></button>',
        nextArrow: '<button class="slider__toggle _next"><i class="slider__icon icon-arrow2-right"></i></button>',
        infinite: true,
        // responsive: [
        //     {
        //       breakpoint: 768.1,
        //       settings: {
        //           slidesToShow: 2,
        //       }
        //     },
        //     {
        //       breakpoint: 360.1,
        //       settings: {
        //           slidesToShow: 1,
        //       }
        //     }
        // ]
    })

    /// === DROPDOWN === \\\
    let dropdowns = document.querySelectorAll('.dropdown') 
    dropdowns.forEach(item => dropdown(item))
    function dropdown(dropdown) {
        let title = dropdown.querySelector('.dropdown__title'),
            titleText = dropdown.querySelector('.dropdown__title_text'),
            items = dropdown.querySelectorAll('.dropdown__item')

        title.addEventListener('click', ()=>{ dropdown.classList.toggle('_open') })

        if (items) {
            items.forEach(item => {
                item.addEventListener('click', ()=>{
                    // titleText.textContent = item.textContent
                    items.forEach(i => {  i.classList.remove('_active')  })
                    item.classList.add('_active')
                    dropdown.classList.remove('_open')
                })
            })
        }

        document.addEventListener('click', (e) => {
            let withinBoundaries = e.composedPath().includes(dropdown);
                
            if (!withinBoundaries) {
                dropdown.classList.remove('_open')
            }
        })
    }
    
    // === FORM SEND === \\\
    $("#feedback__form").submit(function (e) { // Устанавливаем событие отправки для формы с id=form
        e.preventDefault();
         $.ajax({
             type: "POST", // Метод отправки
             url: "send.php", // Путь до php файла отправителя
             data: $(this).serialize(),
             success: function () {
                 alert("Ваша заявка отправлена!");
             }
         });
    });
    
    /// === TABS === \\\
    let tabs = document.querySelectorAll('.tabs')
    tabs.forEach(item => {
        let tabsTitles = item.querySelectorAll('.tabs__title'),
            tabsItems = item.querySelectorAll('.tabs__item')

        tabsTitles.forEach(title => {
            title.addEventListener('click', ()=>{
                for (let n = 0; n < tabsTitles.length; n++){
                    if (tabsTitles[n] == title){
                        tabsTitles[n].classList.add('_active')
                        tabsItems[n].classList.add('_active')
                    }
                    else {
                        tabsTitles[n].classList.remove('_active')
                        tabsItems[n].classList.remove('_active')
                    }
                }
            })
        })
    })

    /// === CONTAINER INDENT === \\\
    document.body.style.setProperty('--containerPositionIndent', document.querySelector('.startpage__container').offsetLeft + 'px');

    /// === ANIMATIONS === \\\
    let blocks = document.querySelectorAll('section');
 
    function checkBlocksVisibility() {
        let windowHeight = window.innerHeight;
 
        blocks.forEach(block => {
            let blockPosition = block.getBoundingClientRect().top;
 
            if (blockPosition < windowHeight * 0.9) {
                block.classList.add('_show')
            }
        });
    }
 
    checkBlocksVisibility();
 
    window.addEventListener('scroll', checkBlocksVisibility);

    /// === TRANSLATE === \\\
    let translateSwitch = document.querySelector('.translate')
    var translateStatus = translateSwitch.textContent.toLowerCase()
    let translateData = 
            [
                {
                    ru: `От идеи до MVP за 3 месяца`,
                    eng: `Seamless Solutions For a Mobile World`,
                },
                {
                    ru: `Работаем с лучшим кроссплатформенным решением, которое позволяет создавать качественные мобильные приложения в короткие сроки`,
                    eng: `Navigate the complexities of the mobile world with our seamless solutions. From concept to launch, we provide comprehensive services to ensure your success.`,
                },
                {
                    ru: `Связаться <i class="contactus__icon icon-arrow1-top-right"></i>`,
                    eng: `Contact Us <i class="contactus__icon icon-arrow1-top-right"></i>`,
                },
                {
                    ru: `30+ успешно <br>запущенных проектов`,
                    eng: `30+ successfully <br>launched projects`,
                },
                {
                    ru: `<i class="phone__icon icon-cup"></i>LTC Hackathon<br>2023`,
                    eng: `<i class="phone__icon icon-cup"></i>LTC Hackathon <br>2023 Winner!`,
                },
                {
                    ru: `<i class="phone__icon icon-ticket-time"></i> 3 месяца среднее <br>время разработки`,
                    eng: `<i class="phone__icon icon-ticket-time"></i> 3 months on average <br>for development`,
                },
                {
                    ru: `<i class="phone__icon icon-star"></i> 4.5 звезды - наш <br>рейтингв сторах`,
                    eng: `<i class="phone__icon icon-star"></i> 4.5 star avg. rating <br>of our apps`,
                },
                {
                    ru: `Технологии нового уровня`,
                    eng: `Next-level technologies`,
                },
                {
                    ru: 'Мобильное приложение <span class="_color-blue">ключевой инструмент вашего бизнеса</span>',
                    eng: 'A mobile app is a <span class="_color-blue">key tool for your business</span>',
                },
                {
                    ru: `Раскройте потенциал вашего бизнеса с помощью нашего мобильного приложения. Оптимизируйте работу, привлекайте клиентов и будьте впереди конкурентов.`,
                    eng: `Unlock the potential of your business with our mobile app. Streamline operations, engage customers, and stay ahead of the competition.`,
                },
                {
                    ru: 'Увеличение доступности',
                    eng: 'Increased accessibility',
                },
                {
                    ru: 'Мобильные приложения делают ваш бизнес доступным для клиентов в любое время и в любом месте. Ваши клиенты могут легко получить доступ к вашим услугам или товарам, просто открыв приложение на своем смартфоне.',
                    eng: 'Mobile apps make your business available to your customers anytime and anywhere. Your customers can easily access your services or products by simply opening the app on their smartphone.',
                },
                {
                    ru: 'Улучшенный маркетинг и взаимодействие с клиентами',
                    eng: 'Improved marketing and customer interaction',
                },
                {
                    ru: 'Упрощение коммуникации с клиентом через Push-уведомления о специальных предложениях, акциях и новых продуктах, что способствует увеличению лояльности клиентов.',
                    eng: 'You can send them notifications about special offers, promotions and new products, which helps to increase customer loyalty.',
                },
                {
                    ru: 'Повышение удобства и персонализации',
                    eng: 'Increased convenience and personalization',
                },
                {
                    ru: 'Мобильные приложения позволяют создавать персонализированные предложения и услуги для каждого клиента на основе их предпочтений и истории взаимодействия с вашим брендом.',
                    eng: 'Mobile apps allow you to create personalised offers and services for each customer based on their preferences and history of interaction with your brand.',
                },
                {
                    ru: 'Конкурентное преимущество',
                    eng: 'Competitive advantage',
                },
                {
                    ru: 'В настоящее время мобильные приложения уже стали стандартом для большинства бизнесов. Те, кто не использует этот инструмент, рискует отставать от конкурентов.',
                    eng: `Nowadays, mobile apps have already become a standard for most businesses. Those that don't utilise this tool risk falling behind the competition.`,
                },
                {
                    ru: `Наша студия специализируется на <span class="_color-blue">MVP</span>`,
                    eng: `Our Studio Specialises In <span class="_color-blue">MVPs</span>`,
                },
                {
                    ru: `Мы приложим все усилия чтобы ваше выпустить ваше приложение в кратчайшие сроки с необходимом функционалом и качественным дизайном.`,
                    eng: `We will make every effort to release your app in the shortest possible time with the necessary functionality and quality design.`,
                },
                {
                    ru: `Что вы <span class="_color-blue">получите</span>`,
                    eng: `What you <span class="_color-blue">get</span>`,
                },
                {
                    ru: `Реализацию идеи от опытной команды разработчиков`,
                    eng: `Discover what awaits you! Explore our offerings and uncover the benefits that await with our products or services. Find out more now!`,
                },
                {
                    ru: `Качественное приложение`,
                    eng: `Excellence In App Development`,
                },
                {
                    ru: `Вы получите высококачественное приложение, разработанное с применением лучших технологий. Наша команда стремится к безупречности в каждом аспекте приложения, чтобы обеспечить надежность и эффективность.`,
                    eng: `You will get a high quality application developed with the best technology. Our team strives for flawlessness in every aspect of the app to ensure reliability and efficiency.
                `,
                },
                {
                    ru: `Скорость разработки`,
                    eng: `Efficiency Redefined`,
                },
                {
                    ru: `Наш подход к разработке основан на эффективности и оптимизации времени. Мы стремимся минимизировать время от идеи до реализации, предлагая быстрые сроки выполнения проекта без потери качества. Это позволяет вам получить ваш продукт на рынок быстрее и опережать конкурентов.`,
                    eng: `Our development approach is based on efficiency and time optimisation. We aim to minimise the time from idea to implementation, offering fast project turnaround times without sacrificing quality. This allows you to get your product to market faster and ahead of the competition.`,
                },
                {
                    ru: `Удобный и красивый дизайн`,
                    eng: `Sleek Design, Seamless Experience`,
                },
                {
                    ru: `Ваше приложение будет обладать не только выдающейся функциональностью, но и привлекательным внешним видом. Мы уделяем особое внимание дизайну, создавая удобный и красочный интерфейс, который обеспечит приятный пользовательский опыт.`,
                    eng: `Your app will not only have outstanding functionality, but also an attractive appearance. We pay special attention to design, creating a user-friendly and colourful interface that will provide a pleasant user experience.`,
                },
                {
                    ru: `Экспертное мнение`,
                    eng: `Guided By Expert Insight`,
                },
                {
                    ru: `Мы предоставляем не только техническое исполнение, но и экспертное мнение по всем аспектам разработки. Наша команда профессионалов готова поделиться своим опытом и рекомендациями, чтобы ваш проект был не только успешным, но и долгосрочно устойчивым.`,
                    eng: `We provide not only technical execution but also expert opinion on all aspects of development. Our team of professionals is ready to share their experience and recommendations to make your project not only successful, but also long-term sustainable.
                    `,
                },
                {
                    ru: `Как мы <span class="_color-blue">работаем</span>`,
                    eng: `How we <span class="_color-blue">work</span>`,
                },
                {
                    ru: `Обсуждение будущего продукта`,
                    eng: `Collaboratively Defining Goals, Priorities, and MVP Functionality`,
                },
                {
                    ru: `Вместе определим цели и приоритеты, разобьём проект на этапы и определим необходимый базовый функционал MVP для быстрой проверки гипотез вашей бизнес-модели. Составим детальное Техническое задание и предварительное коммерческое предложение на каждый из этапов создания/развития проекта.`,
                    eng: `Discussing the future product Together we will define goals and priorities, divide the project into stages and define the necessary basic MVP functionality to quickly test the hypotheses of your business model. We will draw up a detailed Terms of Reference and a preliminary commercial proposal for each of the stages of project creation/development`,
                },
                {
                    ru: `Создание Дизайна и прототипа`,
                    eng: `Creating a Design and Prototype`,
                },
                {
                    ru: `Создадим дизайн и прототип интерфейса будущего приложения. Мы воспроизведём структуру и продумаем основные сценарии пользовательского поведения. Прототипирование позволит учесть максимум мелочей, тем самым сэкономив часы на дальнейших этапах.`,
                    eng: `We will create a design and prototype of the interface of the future application. We will reproduce the structure and think through the main scenarios of user behavior. Prototyping will allow us to take into account maximum details, thus saving hours on further stages.`,
                },
                {
                    ru: `Разработка проекта`,
                    eng: `Project development`,
                },
                {
                    ru: `После внесения необходимых корректировок в документацию и дизайн, мы дадим окончательную оценку этапов по времени и стоимости и приступим к воплощению вашей идеи в реальный продукт, гарантируя качество и пошаговую отчетность в процессе работы`,
                    eng: `After making the necessary adjustments to the documentation and design, we will give a final estimate of the stages in time and cost and begin to realize your idea into a real product guaranteeing quality and step-by-step reporting in the process of work`,
                },
                {
                    ru: `Тестирование > Запуск > Тех поддержка`,
                    eng: `Testing > Launch > Tech Support`,
                },
                {
                    ru: `Проводим функциональное тестирование на наличие багов. Адаптируем приложение на разные разрешения телефонов. Оформляем страницу приложения и публикуем в магазины App Store и Google Play. Следим за стабильностью работы приложения осуществляя тех поддержку.`,
                    eng: `Conduct functional testing for bugs. Adapt the application for different phone resolutions. We design the application page and publish it in the App Store and Google Play stores. Monitor the stability of the application by providing technical support.`,
                },
                {
                    ru: `<span class="_color-blue">Преимущества</span> нашей студии`,
                    eng: `<span class="_color-blue">Advantages</span> of our studio`,
                },
                {
                    ru: `Тщательно продумываем каждый этап разработки`,
                    eng: `Streamline operations, engage customers, and stay ahead of the competition.`,
                },
                {
                    ru: `Высокий рейтинг в сторах. Все пользователи высоко оценивают качество и дизайн наших приложений`,
                    eng: `High rating in Stores All users highly appreciate the quality and design of our applications`,
                },
                {
                    ru: `Работаем с AI. Опыт работы интеграцией Chat GPT, Gemini, Midjorney`,
                    eng: `Working with AI Experience with Chat GPT, Gemini, Midjorney integration`,
                },
                {
                    ru: `Большой опыт в разработке приложений. Наша команда в сфере IT и разработки приложений более 5 лет`,
                    eng: `Extensive experience in app development Our team has been in IT and app development for over 5 years.`,
                },
                {
                    ru: `Всегда готовы помочь. Мы всегда готовы помочь, объяснить, настроить или просто поговорить. Ваш комфорт – наш приоритет!`,
                    eng: `Always ready to help We are always ready to help, explain, customise or just talk. Your comfort is our priority!`,
                },
                {
                    ru: `Наши <span class="_color-blue">работы</span>`,
                    eng: `Our Recent <span class="_color-blue">Work</span>`,
                },
                {
                    ru: `Разрабатываем на Flutter и FlutterFlow. <br>Приложение будет работать как на iOS так и Android <br>и значительно ускорит время разработки.`,
                    eng: `We develop on Flutter and FlutterFlow The <br>app will work on both iOS and Android and <br>will significantly speed up development time.`,
                },
                {
                    ru: `Наша <span class="_color-blue">команда</span>`,
                    eng: `Our <span class="_color-blue">Team</span>`,
                },
                {
                    ru: `За каждым успешным проектом стоит специалист своего дела`,
                    eng: `Behind every successful partnership at XXLDEV`,
                },
                {
                    ru: `Превращаем концепции в реальность`,
                    eng: `Practice at their pace, pace, filling in gaps in their understanding.`,
                },
                {
                    ru: `Часто Задаваемые вопросы <span class="_color-blue">(FAQ)</span>`,
                    eng: `Frequently Asked Questions <span class="_color-blue">(FAQ)</span>`,
                },
                {
                    ru: `Какой бюджет я должен выделить на запуск приложения?`,
                    eng: `What budget should I allocate for launching an app?`,
                },
                {
                    ru: `Бюджет на запуск приложения может сильно варьироваться в зависимости от требуемого функционала, сложности дизайна, платформы (iOS, Android или обе) и других факторов. Мы готовы обсудить ваши требования и предложить оптимальное решение, которое соответствует вашему бюджету.`,
                    eng: `The budget for launching an app can vary greatly depending on the required functionality, complexity of design, platform (iOS, Android or both) and other factors. We are ready to discuss your requirements and come up with the best solution that fits your budget.`,
                },
                {
                    ru: `Сколько времени потребуется для создания приложения?`,
                    eng: `How much time will it take to create an app?`,
                },
                {
                    ru: `Время разработки приложения также зависит от его сложности и требований. Мы обычно предоставляем оценку времени после тщательного изучения вашего проекта.`,
                    eng: `App development time also depends on the complexity and requirements of the app. We usually provide an estimate of time after thoroughly reviewing your project.`,
                },
                {
                    ru: `Почему так быстро вы сможете запустить приложение?`,
                    eng: `Why will you be able to launch the app so quickly?`,
                },
                {
                    ru: `Наша команда имеет богатый опыт в разработке мобильных приложений и использует современные методы разработки, что позволяет нам оптимизировать процесс и достигать быстрых результатов без ущерба качеству.`,
                    eng: `Our team has extensive experience in mobile app development and uses modern development methods, which allows us to optimise the process and achieve fast results without compromising on quality.`,
                },
                {
                    ru: `Что от меня нужно, чтобы начать разработку мобильного приложения?`,
                    eng: `What do I need from me to start mobile app development?`,
                },
                {
                    ru: `Для начала разработки мы нуждаемся в детальном описании вашей идеи или требований к приложению. Чем более подробно вы опишете свои ожидания, тем лучше мы сможем воплотить их в реальность.`,
                    eng: `To start development, we need a detailed description of your idea or requirements for the app. The more detailed you describe your expectations, the better we can turn them into reality.`,
                },
                {
                    ru: `Осуществляете ли вы поддержку продукта после запуска?`,
                    eng: `Do you provide post-launch product support?`,
                },
                {
                    ru: `Да, мы предлагаем услуги поддержки продукта после его запуска. Это включает в себя исправление ошибок, обновление функционала, адаптацию под новые версии операционных систем и другие необходимые работы для поддержания приложения в актуальном состоянии.`,
                    eng: `Yes, we offer post-launch support services. This includes bug fixes, functionality updates, adaptation to new versions of operating systems and other necessary work to keep the application up to date.`,
                },
                {
                    ru: `Подпишете ли вы соглашение о неразглашении?`,
                    eng: `Will you sign a non-disclosure agreement?`,
                },
                {
                    ru: `Да, мы готовы подписать соглашение о неразглашении (NDA), чтобы обеспечить конфиденциальность вашей идеи и всех связанных с ней данных. Ваша безопасность и уверенность в сохранении конфиденциальности являются для нас приоритетом`,
                    eng: `Yes, we are ready to sign a non-disclosure agreement (NDA) to ensure the confidentiality of your idea and all related data. Your safety and confidence in maintaining your confidentiality is our priority.`,
                },
                {
                    ru: `Всеволод Коргин`,
                    eng: `Vsevolod Korgin`,
                },
                {
                    ru: `Соучредитель (Отдел по работе с клиентами)`,
                    eng: `Co-founder (Client Service)`,
                },
                {
                    ru: `В продажах и управлении IT проектами с 2005 года;`,
                    eng: `In sales and IT project management since 2005;`,
                },
                {
                    ru: `Кайфую от упаковки и структурирования идеи клиента, вижу детали и развилки благодаря своему разностороннему накопленному опыту;`,
                    eng: `I get high from packaging and structuring the client's idea, I see details and forks thanks to my versatile accumulated experience;`,
                },
                {
                    ru: `Максимально оперативно, профессионально и с индивидуальным подходом доведу Вашу идею до наилучшего результата;`,
                    eng: `I will bring your idea to the best result as quickly as possible, professionally and with an individual approach;`,
                },
                {
                    ru: `Помогу подобрать оптимальный набор  инструментов и решений как по деньгам, так и по наполнению для крутой  реализации Вашей идеи.`,
                    eng: `I will help you to choose the optimal set of tools and solutions both in terms of money and content for the cool realization of your idea.`,
                },
                {
                    ru: `Студия это мечта, к которой я шёл всю свою жизнь, ради которой я накапливал опыт и набивал шишки`,
                    eng: `Studio is a dream, to which I have been going all my life, for the sake of which I have been accumulating experience and kicking up bumps.`,
                },
                {
                    ru: `Надежда Тихомирова`,
                    eng: `Nadezhda Tikhomirova`,
                },
                {
                    ru: `Исполнительный директор`,
                    eng: `Executive Director`,
                },
                {
                    ru: `Управленец со стажем 24 года. Последние 10 лет руководила заводом по производству газоаналитического оборудования igm-pribor.ru`,
                    eng: `Manager with 24 years of experience. For the last 10 years she has been managing a plant producing gas analyzing equipment igm-pribor.ru.`,
                },
                {
                    ru: `Частный инвестор`,
                    eng: `Private investor`,
                },
                {
                    ru: `Выпускница Executive MBA ИМИСП, К.И.Н`,
                    eng: `Executive MBA graduate of IMISP, C.I.N.`,
                },
                {
                    ru: `Вижу нестандартные решения, воплощаю в жизнь, ускоряю все процессы x10. <br>Коренная Петербурженка, неисправимый оптимист.`,
                    eng: `I see non-standard solutions, put them into practice, accelerate all processes x10. <br>Native Petersburger, incorrigible optimist.`,
                },
                {
                    ru: `Никита Нитемин`,
                    eng: `Nikita Nitemin`,
                },
                {
                    ru: `Технический директор`,
                    eng: `Technical Director`,
                },
                {
                    ru: `5 лет в области in-app рекламы в OMD Group и BYYD.`,
                    eng: `5 years in in-app advertising at OMD Group and BYYD.`,
                },
                {
                    ru: `Опыт разработки приложений с разнообразным функционалом, включая проекты с более чем 50 экранами.`,
                    eng: `Experience in developing apps with a variety of functionality, including projects with more than 50 screens.`,
                },
                {
                    ru: `Эффективно веду и управляю процессом разработки мобильных приложений на Flutter и FlutterFlow.`,
                    eng: `Effectively lead and manage the mobile app development process on Flutter and FlutterFlow.`,
                },
                {
                    ru: `Специализируюсь на создании MVP, что позволяет быстро превращать ваши идеи в жизнеспособные продукты.`,
                    eng: `Specialize in building MVPs, allowing you to quickly turn your ideas into viable products.`,
                },
                {
                    ru: `Стремлюсь к точности, совершенствованию и внедрению новых технологий для достижения самого лучшего качества. `,
                    eng: `Striving for accuracy, improvement and adopting new technologies to achieve the best quality. `,
                },
                {
                    ru: `Готов воплотить вашу идею мобильного приложения в жизнь с максимальным качеством и профессионализмом.`,
                    eng: `Ready to bring your mobile app idea to life with the utmost quality and professionalism.`,
                },
                {
                    ru: `КАК МЫ МОЖЕМ ВАМ ПОМОЧЬ?`,
                    eng: `HOW CAN WE HELP?`,
                },
                {
                    ru: `Начните создание вашего приложения!`,
                    eng: `Let's Plan For Your Next Level!`,
                },
                {
                    ru: `Отправляя эту форму, я подтверждаю, что прочитал и принимаю <a href="#" class="form__link">политику конфиденциальности</a>`,
                    eng: `By sending this form I confirm that I have read and accept the <a href="#" class="form__link">Privacy Policy</a>`,
                },
                {
                    ru: `Отправить<i class="form__icon icon-mail"></i>`,
                    eng: `Submit<i class="form__icon icon-mail"></i>`,
                },
                {
                    ru: `Специализируясь на создании высококачественных мобильных приложений на Flutter, мы предлагаем решения, сочетающие в себе удобство, скорость и адаптивность. Мы верим, что креативность и внимание к деталям - это ключ к созданию уникальных продуктов, которые выделяются на рынке.`,
                    eng: `Specializing in building high-quality mobile applications on Flutter, we offer solutions that combine usability, speed and adaptability. We believe that creativity and attention to detail is the key to creating unique products that stand out in the market.`,
                },
                {
                    ru: `Казахстан, Алматы <br> +7 700 420 5555`,
                    eng: `Kazakhstan, Almaty <br> +7 700 420 5555`,
                },
                {
                    ru: `Санкт-Петербург, Россия <br>+7 960 273 87 03 `,
                    eng: `St. Petersburg, Russia <br>+7 960 273 87 03 `,
                },
                {
                    ru: `контакты`,
                    eng: `CONTACT`,
                },
                {
                    ru: `соц. сети`,
                    eng: `FOLLOW US`,
                },
                {
                    ru: `Главная`,
                    eng: `Main`,
                },
                {
                    ru: `Приложение`,
                    eng: `App`,
                },
                {
                    ru: `Студия`,
                    eng: `Studio`,
                },
                {
                    ru: `Что вы получите`,
                    eng: `Your Benefits`,
                },
                {
                    ru: `Как мы работаем`,
                    eng: `How We Work`,
                },
                {
                    ru: `Преимущества`,
                    eng: `Advantages`,
                },
                {
                    ru: `Наши работы`,
                    eng: `Our Work`,
                },
                {
                    ru: `Команда`,
                    eng: `Team`,
                },
                {
                    ru: `Вопросы/Ответы`,
                    eng: `FAQ`,
                },
                {
                    ru: `Обратная связь`,
                    eng: `Feedback`,
                },
            ],
        translateDataLists = [
            {
                'ru': 'Шаг ',
                'eng': 'Step ',
                'elem': '.steps__tab'
            }
        ],
        translateDataInputs = [
            {
                'ru': 'Имя',
                'eng': 'Name',
            },
            {
                'ru': 'Описание проекта',
                'eng': 'Project Description',
            }
        ]

    translateDataLists.forEach(item => {
        let elems = document.querySelectorAll(item['elem'])
        elems.forEach(elem => {
            translateData.push({
                'ru': translateStatus == 'eng' ? elem.textContent.replace(item['eng'], item['ru']) : elem.textContent,
                'eng': translateStatus == 'eng' ? elem.textContent : elem.textContent.replace(item['ru'], item['eng'])
            })
        })
    })
    translateSwitch.addEventListener('click', ()=>{
        translateData.forEach(item => {
            translateStatus == 'ru' ? changeText(item['ru'], item['eng']) : changeText(item['eng'], item['ru'])
        })
        if (translateStatus == 'ru'){
            translateStatus = 'eng'
            translateSwitch.textContent = 'ENG'
            document.body.classList.add('_eng')
            document.body.classList.remove('_ru')
        }
        else {
            translateStatus = 'ru'
            translateSwitch.textContent = 'RU'
            document.body.classList.remove('_eng')
            document.body.classList.add('_ru')
        }
        console.log(document.documentElement.innerHTML);
        return translateStatus
    })
    let nodes = []
    document.querySelectorAll('*').forEach(item => {
        if (item.innerHTML.trim().split("\n")[0].length > 0 ){
            nodes.push(item)
        }
    })
    function clean(str) {
        return str.toLowerCase().trim().replaceAll(' ', '').replaceAll(/(\r\n|\n|\r)/gm, '').replaceAll('>', '').replaceAll('<', '').replaceAll('&gt;', '')
    }
    function changeText(oldText, newText) {
        try {
            let correctNodes = []
            nodes.forEach(node => {
                let actual = clean(node.innerHTML),
                    old = clean(oldText)
                    
                if (actual == old){

                    correctNodes.push(node)

                    correctNodes = correctNodes.reverse()
                    let arr = []
                    for (let n = 0; n < correctNodes.length ; n++){
                        if (correctNodes[n].innerText == correctNodes[0].innerText) {
                            arr.push(correctNodes[n])
                        }
                    }
                    if (arr.length > 1){
                        arr.forEach(item => {
                            item.innerHTML = newText
                        })
                    }
                    else{
                        correctNodes[0].innerHTML = newText
                    }
                }
                else if (node.childNodes[0].nodeValue && node.childNodes[0].nodeValue.length > 0){

                    let e1 = clean(node.childNodes[0].nodeValue),
                        e2 = clean(oldText.split('<br>')[0]),
                        newTextArr = newText.split('<br>')

                    if (e1.includes(e2)){
                        for (let n = 0; n < node.childNodes.length - 1; n++){
                            try {

                                if (node.childNodes[n].nodeName == '#text'){
                                    node.childNodes[n].nodeValue = newTextArr[0]
                                    newTextArr.shift()
                                }
                            }
                            catch(err) { console.log(err); }
                        }
                    }

                }
            })
        }
        catch(err){
            console.log('Error with text "' + oldText + '": ' + err);
        }

        let fields = []

        document.querySelectorAll('input').forEach(item => {fields.push(item)})
        document.querySelectorAll('textarea').forEach(item => {fields.push(item)})

        fields.forEach(field => {
            translateDataInputs.forEach(val => {
                if (translateStatus == 'eng') {
                    clean(val['eng']) == clean(field.getAttribute('placeholder')) ? field.placeholder = val['ru'] : ''
                }
                if (translateStatus == 'ru') {
                    clean(val['ru']) == clean(field.getAttribute('placeholder')) ? field.placeholder = val['eng'] : ''
                }
            })
        })
    }
    // === RADIO BUTTONS === \\
    // let radios = document.querySelectorAll('.radio')

    // radios.forEach(item => {radio(item)})
    // function radio(radio) {
    //     let radioItems = radio.querySelectorAll('.radio__item')
    //     radioItems.forEach(item =>{
    //         item.addEventListener('click', ()=>{
    //             radioItems.forEach(i => {i.classList.remove('_active')})
    //             item.classList.add('_active')
    //         })
    //     })
    // }

    // === INPUT MASK === \\\
    // $(elem).mask("9999 9999 9999 9999")
    
    // === CHECK EMAIL === \\\
    // function checkEmail(email) {
    //     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     if (!re.test(email.value)){
    //         email.parentNode.classList.add('_error')
    //         email.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'center'
    //         });
    //         return false
    //     }
    //     else{
    //         email.parentNode.classList.remove('_error')
    //         return true
    //     }
    // }

    // === DYNAMIC ADAPTIVE === \\
    function mediaQueries() {
        if (window.matchMedia('(max-width: 1440px)').matches){
            
        }
        if (window.matchMedia('(max-width: 1024px)').matches){
            
        }
        if (window.matchMedia('(max-width: 768px)').matches){
            
        }
        if (window.matchMedia('(max-width: 576px)').matches){
            
        }
        if (window.matchMedia('(max-width: 360px)').matches){
            
        }
    };
    
    mediaQueries()
    window.addEventListener('resize', mediaQueries)
})